var page_submitted = false;
var field_validator,
	current_page,
	mooli,
	scroll_position_x;

window.addEvent('domready', function() {
	current_page = document.querySelectorAll('body')[0].id;

	if(current_page == 'page_reg_half' || current_page == 'page_reg_full') {
		setFilledClass();
	}
	if(current_page == 'page_pregame') {
		// if($$('.question_form').length > 0) {
		// 	initialize_quiz();
		// }
		if($$('.selection_form').length > 0) {
			initialize_selectedPrize();
		}
		if($$('.email_form').length > 0) {
			mooli = new Moolidator_Lite({
			'form_id': 'form_pregame',
			'submit_button_id': 'submit_pregame',
			'debug' : false,
			'rules': moolidator_lite_rules,
			'countries': moolidator_lite_countries
			});
			mooli.addEvents({
				'moolidator_lite_submit': function() {
					if(page_submitted === false) {
						page_submitted = true;
						$('form_pregame').submit();
					}
				}
			});
		}
	}
});

// selector to open iframe
// searching all a-tags in the selector or as selector
// define id = '#id', class = '.class', multi = '#id .class'
// define 'type': 'iframe'
// define 'regex' : {0:/RegEx/}
// Object with avalible keys('id', 'class');
var iframe_selector = new Class({
	Implements: Options,
	options: {
		target_window : 'popped_iframe'
	},

	regex_pdf: /\.pdf$/,
	regex_javascript : /^javascript/,

	initialize: function(options) {
		var _self = this;
		_self.setOptions(options);
		_self.check_selectors();
	},

	check_selectors: function() {
		var _self = this;

		Object.each(_self.options.selectors, function(value,key) {
			for(var i = 0; i< $$(key).length; i++) {
				if($$(key)[i].get('tag') == 'a') {
					if(value.regex && typeOf(value.regex) == 'object') {
						if(_self.check_selector_regex($$(key)[i], value.regex) === true) {
							_self.setup_selector($$(key)[i], value.type);
						}
					} else {
						_self.setup_selector($$(key)[i], value.type);
					}
				} else {
					i = $$(key).length +1;
					var links = $$(key+ ' a');
					for(var x = 0; x < links.length; x++) {
						if(value.regex && typeOf(value.regex) == 'object') {
							if(_self.check_selector_regex(links[x], value.regex) === true) {
								_self.setup_selector(links[x], value.type);
							}
						} else {
							_self.setup_selector(links[x], value.type);
						}
					}
				}
			}
		});
	},

	setup_selector: function(element, type) {
		var _self = this;

		if(element.hasClass('advertiselink') || element.hasClass('ignore') || element.href.test(_self.regex_javascript, 'i')) return;

		if(element.href) {
			element.removeEvents();
			if(element.href.test(_self.regex_pdf) == false) {
				if(type == 'iframe') {
					_self.add_open_iframe_events(element);
				}
				if(type == 'layer') {
					element.target = _self.options.target_window;
					element.addEvent('click', function() {
						open_layer(element, element.href);
					});
				}
			} else {
				_self.add_open_iframe_events(element);
			}
		}
	},

	add_open_iframe_events: function(element) {
		var _self = this;
		element.target = _self.options.target_window;
		element.addEvent('click', function(e) {

			// prevent browser from opening the link in a new tab (wheel-click)
		    if(e.event.button == 1) {
		        element.click();
		        return false;
		    }

			open_iframe();
		});
	},

	check_selector_regex: function(element, regex_obj) {
		var _self = this;
		var clear = false;

		if(regex_obj[0] !== undefined) {
			Object.each(regex_obj, function(value, key) {
				if(element.href && element.href.test(value)){
					clear = true;
				}
			});
		} else {
			if(element.href && element.href.test(regex_obj)){
				clear = true;
			}
		}
		return clear;
	}
});

var open_iframe = function() {
	//save scroll position
	scroll_position_x = window.getScroll().y;
	$('pop_iframe').setStyle('display', 'block');
	$('content_wrapper').setStyle('display','none');

	if(window.innerHeight) {
		var height = window.innerHeight;
	} else if (document.body) {
		var height = document.body.clientHeight;
	} else {
		var height = $(document.body).getStyle('height');
	}

	window.scroll(0, 0);
};

var open_layer = function(element, href) {
	//save scroll position
	scroll_position_x = window.getScroll().y;

	if(href) {
		var link = href;
	} else {
		var link = element.href;
	}
	var req = new Request({
		url: link,
		method: 'GET',
		onSuccess: function(response) {
			$('pop_iframe').setStyle('display', 'block');
			$$('#pop_iframe iframe')[0].setStyle('height', 0);
			$$('#pop_iframe iframe')[0].setStyle('display','none');
			if($('content_wrapper')){
				$('content_wrapper').setStyle('display','none');
			}

			if(!$('popped_layer')) {
				var popped_layer  = new Element('div', {
					id: 'popped_layer'
				});
                popped_layer.inject($('pop_iframe_closer'), 'before');
			}

			// clean content
			$('popped_layer').set('html', response);
			$$('#popped_layer link').dispose();
			$$('#popped_layer meta').dispose();
			$$('#popped_layer style').dispose();
			$$('#popped_layer title').dispose();
			$$('#popped_layer a').each(function(element) {
				if(element.href.test(/self.close()/) == true || element.href.test(/window.close()/) == true) {
					element.dispose();
				}
			});

            $('pop_iframe_closer').addClass('popped_layer');
            $('pop_iframe').setStyle('background-color', $('popped_layer').getStyle('background-color'));
            $$('#popped_layer .poplink, #popped_layer .sponsoren_iframe').each(function(element,index) {
                if(element.href.test(/sponsor.htm|cgi-bin|_sponsoren/) === true) {
                    if(element.hasClass('ignore') === false) {
                        element.removeAttribute('target');
                        var href = element.href;
                        element.href = "javascript:void(0)";
                        element.removeClass('poplink');
                        element.addEvent('click',function(){
                            $('pop_iframe_closer').fireEvent('click');
                            open_layer(element,href);
                        });
                    }
                }
            });
		}
	}).send();
	window.scroll(0, 0);
};

/* Question on the first page */
var initialize_quiz = function() {
	if($$('.answers').length > 0) {
		$$('.answers label').addEvent('click', function() {
			$$('.answers label').removeClass('active');
			if($$('.answers label.active').length == 0) {
				$(this).addClass('active');
				setTimeout(function() {
					$('form_pregame').submit();
				}, 25);
			}
		});
		if($$('.prize_image img').length > 0){
			$$('.prize_image img')[0].addEvent('click', function() {
				$$('.answers label').removeClass('active');
					setTimeout(function() {
						$('form_pregame').submit();
					}, 25);
			});
		}
	}
};


/* select Prize START */
var initialize_selectedPrize = function() {
	if($$('.voucher label').length > 0) {
		$$('.voucher label').addEvent('click', function() {	
			var answerPrize = this.dataset.identifier;
			$('wingame_special_prize1').set('value', answerPrize);
			setTimeout(function() {
				$$('#form_pregame')[0].submit();
			}, 25);
		});
	}
};

/* select Prize END */
var add_pop_iframe_closer_events = function() {
	if ($('pop_iframe_closer')) {
        $('pop_iframe_closer').addEvent('click', function() {
            if($('content_wrapper')){
                $('content_wrapper').setStyle('display', 'block');
            }
            if ($('pop_iframe')) {
                $('pop_iframe').setStyle('display', 'none');
                $('pop_iframe').setStyle('height', '0px');
			}
			if ($('popped_iframe')) {
                $('popped_iframe').set('src', 'about:blank');
			}
            if($('popped_layer')) {
                $('popped_layer').empty();
                $('popped_layer').destroy();
                $$('#pop_iframe iframe')[0].removeProperty('style');
                $('pop_iframe_closer').removeClass('popped_layer');
            }
            window.scroll(0,scroll_position_x);
        });
	}
};
// set classname filled in input to change the postion of label, if the input is without classname validate
var setFilledClass = function(){
	$$('[id^=form_reg]').getElements('input[type=text]:not(.validate)').each(function(el){
		el.addEvent('blur', function(){
			if(this.get('value') != ''){
				this.addClass('filled');
			}
			else{
				this.removeClass('filled');
			}
		});
	});
}