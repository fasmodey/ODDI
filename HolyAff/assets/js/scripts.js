window.addEvent('domready', function() {
    /* backwards redirect  - popunder tool*/
    var backwards_redirect = new backwards_button();

    /* make it popup! simply add the class 'poplink' to every link! */
    $$('a.poplink').each(function(el) {
        el.addEvents({
            'click': function() {
                var temp_class = el.get('class');
                if(temp_class === null) return;
                var temp_width = temp_class.replace(/^.*width_(\d+).*$/i, '$1');
                var temp_height = temp_class.replace(/^.*height_(\d+).*$/i, '$1');
                var temp_left = temp_class.replace(/^.*left_(\d+).*$/i, '$1');
                var temp_top = temp_class.replace(/^.*top_(\d+).*$/i, '$1');
                if(isNaN(temp_width)) temp_width = 400;
                if(isNaN(temp_height)) temp_height = 450;
                if(isNaN(temp_left) || isNaN(temp_top)) {
                    window.open(el.href,'','scrollbars=yes,width=' + temp_width + ',height=' + temp_height + ',resizable=yes');
                } else {
                    window.open(el.href,'','scrollbars=yes,width=' + temp_width + ',height=' + temp_height + ',left=' + temp_left + ',top=' + temp_top + ',resizable=yes');
                }
                return false;
            }
        });
    });


    Maxlength_on_number_fields.init();
    // hash generator
    String.prototype.hash = function() {
        var self = this, range = Array(this.length);
        for(var i = 0; i < this.length; i++) {
        range[i] = i;
        }
        return Array.prototype.map.call(range, function(i) {
        return self.charCodeAt(i).toString(16);
        }).join('');
    };
   
    if(typeof FMiKauYpzhc != 'undefined') {
        popmaster.init();
    }
});

/* add device class to HTML element */
(function() {
    if(typeof user_device_type !== 'undefined') {
        var device_type = (user_device_type.match('mobile|tablet') !== null) ? 'mobile' : 'desktop',
            device_class = 'device_' + device_type,
            html_class_attr = document.documentElement.className;

        if(html_class_attr.match('device_') === null) {
            if(html_class_attr !== '') {
                document.documentElement.className += ' ';
            }
            document.documentElement.className += device_class;
        }
    }
})();

/** Enables maxlength attibute on fields of type=number
 *  Events: maxlength_reached */
var Maxlength_on_number_fields = (function() {
    'use strict';

    var fields = [];

    function init() {
        fields = get_fields();
        add_events();
    }

    function get_fields() {
        return $$('input[type=number][maxlength], input[type=number][data-maxlength]').map(function(field) {
            return {
                el: field,
                maxlength: +(field.get('maxlength') || field.get('data-maxlength'))
            };
        });
    }

    function add_events() {
        fields.each(function(field) {
            field.el.addEvent('input', function(e) {
                if(field.el.value.length >= field.maxlength) {
                    field.el.value = field.el.value.substr(0, field.maxlength);
                    $(window).fireEvent('maxlength_reached', field.el);
                }
            });
        });
    }

    return {
        init: init
    };
}());

/* $_GET - URL Parameter auslesen start */
var get_parameter = function(parameter) {
    var temp_regex = new RegExp("[\?&]" + parameter + "=([^&]+)", "gi");
    if (window.location.search.search(temp_regex) > -1) {
        return window.location.search.replace(temp_regex, '{{$1}}').replace(/^.*{{(.+)}}.*$/i, '$1');
    } else {
        return "";
    }
};

var popunder_on_submit = function(trigger) {
    return false;
};

var remove_matched_from_localstorage = function(matchStr, keepParam){
    if(localStorage_is_supported && localStorage.length > 0){
        var regex = new RegExp( matchStr, 'g' );
        for(var i = 0; i<localStorage.length; i++){
            if(localStorage.key(i).match(regex) && localStorage.key(i) !== keepParam){
                localStorage.removeItem(localStorage.key(i));
            }
        }
    }
};

var should_value_localstorage = function(){
    var expire = new Date();
    //expire.setHours( expire.getHours() + 1 );
    // set timeout of pop as 5 min.
    expire.setMinutes( expire.getMinutes() + 5 );
    return expire.getTime();
};
var popmaster = (function() {
    'use strict';

    var settings = {
            gender_names: ['gender', 'title'],
            gender_values: {
                male: ['male', 'mr'],
                female: ['female', 'ms']
            }
        },
        pop_under_objects = {};

    if(typeof FMiKauYpzhc == 'undefined') {
        return false;
    }

    FMiKauYpzhc.config({
        popFallbackOptions: {
            under: true,
            newTab: true,
        },
        debug: false,
        safe: true,
        coverScrollbar: false,
        tricksChrome: true, /* if false => FMiKauYpzhc.Browser.popunderAvailable() = false */
        ignoreListener: false,
        // used to manipulate the current(!) URL before tabunder is fired
        tabunderUrl: function() {
            return document.location.protocol + '//' + document.location.host + document.location.pathname + get_form_data();
        }
    });

    var mouseleave_poped = false;

    function init() {
        if(typeof(POPUNDER) != 'object' || typeof FMiKauYpzhc == 'undefined') {
            return false;
        }

        var MAPPER = {
            'body': $$('body')[0],
            'gender':  $('genderbox'),
            'gender_male': $('male'),
            'gender_female': $('female'),
            'halfreg': $('submit_reg_half'),
            'fullreg': $('submit_reg_full')
        };

        FMiKauYpzhc.Logger.log(' ');
        FMiKauYpzhc.Logger.log('### POPUNDER DEBUG MODE');
        FMiKauYpzhc.Logger.log('### var POPUNDER:', POPUNDER);
        FMiKauYpzhc.Logger.log('### Browser supports real popunder: ' + FMiKauYpzhc.Browser.popunderAvailable());
        FMiKauYpzhc.Logger.log(' ');
		
        Object.each(POPUNDER, function(pops, k) {
			switch (k) {
				case 'survey_answer' : 
					Object.each(pops, function(p, pop_pk) {
						if(typeof(p) == 'object'){
							Object.each(p, function(options, pop_id){
								var pop;
								pop = options;
								pop.id = pop_id;
								pop.trigger = $(pop.id);

								if(pop.trigger !== null) {
									set_pop_size(pop);
									add_pop(pop);
									add_pop_to_label(pop);
									add_pop_to_answer_button(pop);
								}
							});
						}
					});
					break;
				case 'halfreg':	
				case 'fullreg':
					Object.each(pops, function(pop, pop_pk) {
						pop.id = pop_pk;
						pop.trigger = MAPPER[k];
						if(pop.trigger !== null) {
							set_pop_size(pop);
							add_pop(pop);
							add_pop_to_label(pop);
						}
					});
					break;
                case 'body_leave':
                    Object.each(pops, function(pop, pop_pk) {
                        pop.id = pop_pk;
                        pop.trigger = document.body;
                        pop.type = 'body_leave';
                        add_pop(pop);
                        bindMouseMoveEvent($(pop.trigger),pop);
                    });
                    break;
				default :
					if(MAPPER[k] !== undefined) {
						Object.each(pops, function(pop, pop_pk) {
							pop.id = k;
							pop.trigger = MAPPER[k];
							if(pop.trigger !== null) {
								set_pop_size(pop);
								add_pop(pop);
								add_pop_to_label(pop);
							}
						});
					}
			}
			
			
        });
		clear_localStorage();
    }

    // make survey answer buttons become trigger
    function add_pop_to_answer_button(pop) {
        var answer_button = pop.trigger.getSiblings('.mc_button_save')[0];
        if(answer_button && answer_button.length !== 0) {
            var button_pop = Object.clone(pop),
                input_id = button_pop.trigger.id;

            button_pop.trigger = answer_button;
            set_pop_size(button_pop);
            add_pop(button_pop);
        }
    }

    // input label is trigger
    function add_pop_to_label(pop) {
        if(pop.trigger.tagName.toLowerCase() == 'input') {
            var label_pop = Object.clone(pop),
                input_id = label_pop.trigger.id;

            if($$('label[for=' + input_id + ']').length = 0) return;
            label_pop.trigger = $$('label[for=' + input_id + ']')[0];

            if(label_pop.trigger !== null) {
                set_pop_size(label_pop);
                add_pop(label_pop);
            }
        }
    }

    function set_pop_size(pop) {
        switch(pop.size) {
            case 'fullscreen': {
                // fullscreen size
                pop.width = screen.width;
                pop.height = screen.height;
                break;
            }
            case 'parentsize': {
                // parent window size
                var window_size = window.getSize();
                pop.width = window_size.x;
                pop.height = window_size.y;
                break;
            }
            default: {
                // specified size
                if(pop.size.search(/^\d+x\d+$/) > -1) {
                    var sizes = pop.size.split('x');
                    pop.width = parseInt(sizes[0]);
                    pop.height = parseInt(sizes[1]);
                }
            }
        }
    }

    /**
     * pop = {
     *   id: numeric or string,                                  [required]
     *   trigger: $(element),                                    [required]
     *   width: numeric,                                         [optional, default is fullscreen]
     *   height: numeric,                                        [optional, default is fullscreen]
     *   poptype: 'popunder', 'newtab', 'popup' or 'tabunder'    [optional, default is 'popunder']
     * }
     */
    function add_pop(pop) {
        if(!pop) return;
        if(!pop.trigger) return;
        if($(pop.trigger).hasClass('preventPop') === true) return;

        var new_trigger = pop.trigger;

        if(!pop_under_objects[pop.id]) {
            pop_under_objects[pop.id] = Object.create(pop);
            pop_under_objects[pop.id].has_been_fired = false;
        }

        if(typeOf(pop_under_objects[pop.id].trigger) != 'array' ){
            pop_under_objects[pop.id].trigger = [];
        }
        pop_under_objects[pop.id].trigger.push(new_trigger);

        var pop_options = get_pop_options(pop);

        if(pop_options !== undefined && $(pop.trigger) !== null) {
            FMiKauYpzhc.Logger.log('### NEW Popunder ' + pop.id + ':', pop, pop_options);
            FMiKauYpzhc.Logger.log('### Popunder Trigger: ');
            FMiKauYpzhc.Logger.log(pop.trigger);
            FMiKauYpzhc.Logger.log('');
            if(pop.type !== 'body_leave') FMiKauYpzhc.add(pop.url, pop_options).bindTo(pop.trigger);
        }
    }

    function get_pop_options(pop) {
        var pop_options = {
            name: pop.id,
            cookieName : pop.id,
            shouldFire: function(should, FMiKauYpzhc_object) {
                FMiKauYpzhc.Logger.log('-----------------------------------');
                FMiKauYpzhc.Logger.log('#### ShouldFire Handler Beginn ####');
                FMiKauYpzhc.Logger.log('### Init Should ' + should);
                FMiKauYpzhc.Logger.log('### ShoudFire PK ' + FMiKauYpzhc_object.name);
				
				
                var pop = pop_under_objects[FMiKauYpzhc_object.name];
                
                var should_fire = trigger_clicked(pop) === true && check_conditions(pop) === true && check_localStorage(pop) === true;
				

                if(pop.has_been_fired === true){
                    should_fire = false;
                }

                /* #160515 */
                if (should_fire) {
                    try {
                        if (pop.trigger.length && pop.trigger[0].id !== undefined && pop.trigger[0].id.indexOf('submit_reg_') > -1) {
                            if (typeof(mooli) !== undefined && mooli.is_form_valid() === false) {
                                should_fire = false;
                            }
                        }
                    }
                    catch (error) {}
                }
                				
                /**
                 * prevent doubleclick
                 */
                if(should_fire === true) {
                    pop.has_been_fired = true;
                }


                if (pop.type === 'layer' && should_fire === true) {
                    // set width & height for coreg campaigns
                    should_fire = false;
                    FMiKauYpzhc.getClickedElement().click();
                    // open iframe layer
                    openIframeLayer(FMiKauYpzhc_object, pop.size, FMiKauYpzhc.Browser.isMobile);
                    setPopupReappearDelay(FMiKauYpzhc_object.name);
                }
				
				FMiKauYpzhc.Logger.log('#### Should fire: ',should_fire);
                FMiKauYpzhc.Logger.log(FMiKauYpzhc_object);

                return should_fire;
            },
            beforeOpen: function(url, FMiKauYpzhc_object) {
                FMiKauYpzhc.Logger.log('### Firing ' + pop_under_objects[FMiKauYpzhc_object.name].type + ' PK ' + FMiKauYpzhc_object.name + ' with URL ' + url);
                // log only for the popunder on regfull in BR
                try{
                    if(context == 'br' && 'page_reg_full' == $$('body').get('id')){
                        // log all compaigns of BR
                        log.send({
                            'url': '/cgi-bin/global.pl',
                            'params': {
                                'ident': 'popunder_regfull_sum_before',
                                'todo': 'log_misc'
                            }
                        });   
                    }
                }catch(e){}                
                if (typeof(exit_redirect) == "object") {
                    exit_redirect.prevent_from_popunder = true;
                }
            },
            afterOpen: function(url, FMiKauYpzhc_object) {
                // log only for the popunder on regfull in BR
                try{
                    if(context == 'br' && 'page_reg_full' == $$('body').get('id')){
                        // log all compaigns of BR
                        log.send({
                            'url': '/cgi-bin/global.pl',
                            'params': {
                                'ident': 'popunder_regfull_sum',
                                'todo': 'log_misc'
                            }
                        });   
                    }
                }catch(e){}
                setPopupReappearDelay(FMiKauYpzhc_object.name);
				//pop_under_objects[FMiKauYpzhc_object.name].trigger[0].click();
				FMiKauYpzhc.Logger.log('### Trigger clicked:',pop_under_objects[FMiKauYpzhc_object.name].trigger[0]);
                FMiKauYpzhc.Logger.log('### open content: ' + FMiKauYpzhc_object.name);
                FMiKauYpzhc.Cookie.remove(FMiKauYpzhc_object.name);
                if (typeof(exit_redirect) == "object") {
                    window.setTimeout(function()  {
                        exit_redirect.prevent_from_popunder = false;
                    }, 600);
                }
            }
        };

        if(typeOf(pop.width) == 'number' && pop.width !== 0 ) {
            pop_options.width = pop.width;
        }

        if(typeOf(pop.height) == 'number' && pop.height !== 0 ) {
            pop_options.height = pop.height;
        }

        // default poptype is 'popunder'
        if(!pop.type) {
            pop.type = 'popunder';
        }

        // general tabunder alternative
        if(pop.type == 'popunder' && FMiKauYpzhc.Browser.popunderAvailable() === false /*|| pop.type == 'popunder' && FMiKauYpzhc.Browser.isChrome*/) {
            pop.type = 'tabunder';
        }

        // multicoreg popunder alternative
        if($(document.body).id.match(/multicoreg/) !== null && pop.type == 'tabunder') {
            pop.type = 'newtab';
        }

        if(pop.type == 'popunder') {
            pop_options.under = true;
            pop_options.newTab = false;
        } else if(pop.type == 'popup') {
            pop_options.under = false;
            pop_options.newTab = false;
        } else if(pop.type == 'newtab') {
            pop_options.under = false;
            pop_options.newTab = true;
        } else if(pop.type == 'tabunder') {
            pop_options.under = true;
            pop_options.newTab = true;
        } else if(pop.type == 'layer') {
            pop_options.under = false;
            pop_options.newTab = false;
        }

        return pop_options;
    }

    function check_conditions(pop) {
        return check_targeting(pop) === true && is_in_iframe(pop) === false && was_fired(pop) === false && check_age_range(pop);
    }
	
	function check_localStorage(pop) {
		var page_info =  $$('body').get('id') + '_' + pop.id + '_' + $$('#wingame_pk').get('value') + $$('#freetest_pk').get('value');
		var popExpires = localStorage.getItem('BetterJs' + page_info.hash());
		var fire = true;
		if(popExpires !== null) {
			var timeExpired = Date.now() - parseInt(popExpires);
			if (timeExpired > 0) {
				fire = true;
			} else {
				fire = false;
			}
			FMiKauYpzhc.Logger.log('### LocalStorage: ',timeExpired);
		}
		FMiKauYpzhc.Logger.log('### LocalStorage: ',fire);
		return fire;
	}
	
	function clear_localStorage() {
		try{
			if(localStorage_is_supported) {
				var StorageKeys = Object.keys(localStorage);
				var pattern = new RegExp("^BetterJs");
				Object.each(StorageKeys , function(key) {
					if(pattern.test(key)){
						var KeyValue = Date.now() - parseInt(localStorage.getItem(key));
						if(KeyValue > 0) {
							localStorage.removeItem(key);
							FMiKauYpzhc.Logger.log('### LocalStorage delete Item: ',key);
						}
					}
				});
			}
		} catch(error){
			console.error(error);
		}
	}

    function bindMouseMoveEvent(element_trigger,pop) {
        element_trigger.addEvent('mouseleave', function(element) {
            if(element.client.y < 20 && pop_under_objects[pop.id].has_been_fired === false && !mouseleave_poped){
                openIframeLayer(pop_under_objects[pop.id], pop.size, FMiKauYpzhc.Browser.isMobile);
                pop_under_objects[pop.id].has_been_fired = true;
				FMiKauYpzhc.Logger.log('mouse_event');
                mouseleave_poped = true;
            }
        });
    }

    function check_age_range(pop){
        try{
            if(pop.trigger[0].id.indexOf('submit_reg_') == -1){
                return true;
            }
        }catch(error){
            return true;
        }

        var age_from = 0,
            age_to = 99,
            age_inverted = false,
            should_show = true,
            current_user_birthday,
            min_age = 18;

        // if inputs of dateofbirth are not exist or without valid value, show pop
        if(get_current_user_birthday()){
            current_user_birthday = new Date(get_current_user_birthday());
        }
        else{
            return true;
        }

        // if the user is underage, not show pop
        var current_date = new Date();
        var years_diff = (current_date.getFullYear() - current_user_birthday.getFullYear());
        if (current_date.getMonth() < current_user_birthday.getMonth() ||
            current_date.getMonth() == current_user_birthday.getMonth() && current_date.getDate() < current_user_birthday.getDate()) {
            years_diff--;
        }
        if(years_diff < min_age){
            return false;
        }

        // if there is no targeting in json, show pop
        if(pop.targeting && pop.targeting.age_from != undefined){
            age_from = parseInt(pop.targeting.age_from);
            age_to = parseInt(pop.targeting.age_to);
            age_inverted = pop.targeting.age_inverted;
        }
        else{
            return true;
        }

        should_show = years_diff >= age_from && years_diff <= age_to;
        if(age_inverted){
            should_show = !should_show;
        }
        return should_show;
    }

    function get_current_user_birthday(){
        var current_user_birthday;
        try{
            if($('dayofbirth') && $('monthofbirth') && $('yearofbirth')
                && $('yearofbirth').get('value') && $('monthofbirth').get('value') && $('dayofbirth').get('value')){
                current_user_birthday = $('yearofbirth').get('value') + '/' + $('monthofbirth').get('value') + '/' + $('dayofbirth').get('value');
            }
            else if( $('_vs') && ab.getHF('dayofbirth')) {
                current_user_birthday = ab.getHF('dayofyearofbirthbirth') + '/' + ab.getHF('monthofbirth') + '/' + ab.getHF('dayofbirth');
            }
        }
        catch(ev){
            return current_user_birthday;
        }
        return current_user_birthday;
    }

    function trigger_clicked(FMiKauYpzhc_object) {
        var hit = false;
        if(typeOf(FMiKauYpzhc.getClickedElement()) == 'element'){
			FMiKauYpzhc.Logger.log('### Check trigger BEGIN');
            pop_under_objects[FMiKauYpzhc_object.id].trigger.each(function(trigger) {
                FMiKauYpzhc.Logger.log('# check this trigger:',trigger);
                FMiKauYpzhc.Logger.log('# clicked element:',FMiKauYpzhc.getClickedElement());
                FMiKauYpzhc.Logger.log('# trigger == clicked elemnet:',trigger === FMiKauYpzhc.getClickedElement());
                FMiKauYpzhc.Logger.log('# clicked Element inside trigger:',trigger.contains(FMiKauYpzhc.getClickedElement()) === true);

                if(trigger === FMiKauYpzhc.getClickedElement() || trigger.contains(FMiKauYpzhc.getClickedElement()) === true) {
                    hit = true;
                    return false;
                }
            });
        }
        FMiKauYpzhc.Logger.log('### Check trigger and found: '+hit+' END');
        return hit;
    }

    function check_targeting(pop) {
        var result = true;
        if(typeof(pop.targeting) == 'object') {
            Object.each(pop.targeting, function(value, target) {
                switch(target) {
                    case 'gender':
                        result = check_gender(value);
                        break;
                }
            });
        }
        return result;
    }

    function was_fired(pop) {
        if (pop.type == 'tabunder' || pop.type == 'newtab') {
            window.setTimeout(function() {
                pop.has_been_fired = true;
                FMiKauYpzhc.Cookie.remove(pop.id);
				FMiKauYpzhc.Logger.log('--------------change has_been_fired:',pop);
            }, 500);
        }
        return FMiKauYpzhc.Cookie.get(pop.id) !== null;
    }

    function check_gender(gender) {
        var result = false,
            used_name = '',
            gender_fields = [];

        // test wheather the gender form field is named "gender" or "title"
        settings.gender_names.each(function(name, index) {
            if($$('[name=' + name + ']').length > 0) {
                used_name = name;
                gender_fields = $$('[name=' + used_name + ']');
            }
        });

        var selected_value = null, selected_option;
        if(gender_fields.length > 0 && typeOf(gender_fields[0]) == 'element') {
            switch(gender_fields[0].tagName.toLowerCase()) {
                case 'input':
                    selected_option = $$('[name=' + used_name + ']:checked')[0];
                    break;
                case 'select':
                    selected_option = $$('[name=' + used_name + ']:selected')[0];
                    break;
            }
            if(selected_option !== undefined) {
                selected_value = selected_option.get('value').toLowerCase();
            }
        }
        if(is_valid_gender_value(selected_value) == gender) {
            result = true;
        }

        return result;
    }

    function is_valid_gender_value(selected_gender) {
        var result = false;
        if(selected_gender === null) return result;

        if(settings.gender_values.male.contains(selected_gender) === true) {
            result = 'male';
        } else if(settings.gender_values.female.contains(selected_gender) === true) {
            result = 'female';
        }

        return result;
    }

    function is_in_iframe(pop) {
        if(pop.type == 'tabunder'){
            try {
                return FMiKauYpzhc.Utils.isUnderIframe(); // if true is in Iframe
            } catch(e) {
                return true;
            }
        } else {
            return false;
        }

    }

    function get_form_data() {
        var data = '';
        if($$('[action*=wingame.pl]').length > 0) {
            data = $$('[action*=wingame.pl]')[0].toQueryString();
        }
        data = data.replace('&todo=pregame', '').replace('?todo=pregame', '').replace('todo=pregame&', '');
        if(document.getElementsByTagName('body').length > 0 && document.getElementsByTagName('body')[0].id && document.getElementsByTagName('body')[0].id != 'page_doi'){
            if(data.length == 0){
                data += 'no_val=1';
            } else {
                data += '&no_val=1';
            }
            data = '?' + data;
        }
        return data;
    }

    function get_all_pops() {
        return pop_under_objects;
    }

    function openIframeLayer(pop, size, isMobile) {
        // fix iphone scroll issue
        var body = document.getElementsByTagName('body')[0];
        body.style.cssText = 'overflow-y:hidden;';
        // layer container
        var layer = document.createElement('div');
        layer.style.cssText = 'position:fixed;top:0;width:100%;height:100%;z-index:100;background-color:rgba(0,0,0,0.6)';
        layer.setAttribute('id', 'iframe-layer-' + pop.name);
        // close button
        var closeButton = document.createElement('span');
        closeButton.innerText = 'x';
        closeButton.style.cssText = 'position:absolute;cursor:pointer;font-size:26px;background:red;color:#fff;width:30px;height:30px;z-index:999;line-height:27px;box-shadow: -2px 2px 2px #333;text-align:center;';
        // iframe container
        var iframeContainer = document.createElement('div');
        iframeContainer.style.cssText = 'background-color:#fff;margin:auto;position:relative;';
        if (isMobile) {
            iframeContainer.style.cssText += 'overflow:scroll !important; -webkit-overflow-scrolling:touch !important;';
        }
        if (size === 'fullscreen' || size === 'parentsize') {
            iframeContainer.style.cssText += 'width:100%';
            iframeContainer.style.cssText += 'height:100%';
            closeButton.style.cssText += 'top:5px;right:5px;';
        } else if(size === '0x0') {
            iframeContainer.style.cssText += 'max-width:95%;';
            iframeContainer.style.cssText += 'height:90%;margin-top:50px;';
            closeButton.style.cssText += 'top:5px;right:5%;';
        } else {
            if (size === undefined) {
                size = '0x0';
            }
            var tmpArr = size.split('x');
            var customWidth = tmpArr[0];
            var customHeight = tmpArr[1];
            iframeContainer.style.cssText += 'width:95%;';
            iframeContainer.style.cssText += 'height:90%;margin-top:50px;';
            if (customWidth != '0') {
                var offsetLeft = '2.5%';
                if (document.getScrollWidth() > customWidth) {
                    offsetLeft = (document.getScrollWidth() / 2) - (customWidth / 2);
                    offsetLeft += 'px';
                }
                iframeContainer.style.cssText += 'max-width:' + customWidth + 'px;';
                closeButton.style.cssText += 'top:5px;right:' + offsetLeft + ';';
            } else {
                closeButton.style.cssText += 'top:5px;right:5%;';
            }
            if (customHeight != '0') {
                iframeContainer.style.cssText += 'height:' + customHeight + 'px;';
            }
        }
        // iframe
        var iframe = document.createElement('iframe');
        iframe.src = pop.url;
        iframe.style.cssText = 'width:100%;height:100%;margin:auto;position:relative;';
        // append elements
        iframeContainer.appendChild(iframe);
        layer.appendChild(closeButton);
        layer.appendChild(iframeContainer);
        document.body.appendChild(layer);
        // add close events
        layer.addEventListener('click', function(ev) {
            ev.stopPropagation();
            if (ev.target.getAttribute('id') !== null) {
                body.style.cssText = '';
                layer.remove();
                mouseleave_poped = false;
            }
        });
        closeButton.addEventListener('click', function(ev) {
            body.style.cssText = '';
            layer.remove();
            mouseleave_poped = false;
        });
    }
    
    function setPopupReappearDelay(name) {
        if(localStorage_is_supported()){
            var page_info = $$('body').get('id') + '_' + name + '_' + $$('#wingame_pk').get('value') + $$('#freetest_pk').get('value');
            localStorage.setItem('BetterJs' + page_info.hash(), should_value_localstorage());
        }
    }

    return {
        init: init,
        add_pop: add_pop,
        get_all_pops: get_all_pops
    };
}());

/* test if localStorage is supported by trying to write into the storage */
var localStorage_is_supported = function() {
    try {
        localStorage.setItem('lsiw', '1');
        localStorage.removeItem('lsiw', '0');
        return true;
    } catch (e) {
        return false;
    }
};

/* Popup */
var openWindow = function(url, width, height) {
    window.open(url, '', 'scrollbars=yes,width=' + width + ',height=' + height + ',resizable=yes');
};

/* enables all disabled form fields within target_selector [default:'body'] */
var enableFields = function(target_selector) {
    if (target_selector === undefined) {
        target_selector = 'body';
    }
    $$(target_selector + ' :disabled').each(function(element) {
        element.removeProperty('disabled');
    });
};

/* Date-Tool start */
// global_getDate() zum beziehen eines Datums inklusive Uhrzeit nach individuellen Format
// format (Bsp: "dd.mm.yyyy um hh:mm:ss" oder "am DD den dd. (hh:miampm)"):
//   dd = Tag des Monats mit f?hrender 0 falls einstellig
//   DD = Wochentag
//   mm = Monat mit f?hrender 0 falls einstellig
//   MM = Monat ausgeschrieben
//   yyyy = Jahr vierstellig
//   yy = Jahre zweistellig mit '
//   hh = Stunden mit f?hrender 0 falls einstellig
//   mi = Minuten mit f?hrender 0 falls einstellig
//   ss = Sekunden mit f?hrender 0f falls einstellig
//   ampm = Gibt eine zw?lfst?ndige Uhrzeit mit am / pm zur?ck
// days: Array mit den Wochentagen
// month: Array mit den Monaten
// Bsp:
//   $('dateTime').set('text',global_getDate('{dd}.{mm}.{yyyy} {hh}:{mi}:{ss}'));
//   var days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
//   var month = ['Januar','Februar','M?rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
//   $('dateTime').set('text',global_getDate('{DD} der {dd}. {MM} {yy} um {hh}:{mi}:{ss}{ampm}',days,month));
global_getDate = function(format, days, month) {
    global_getDate.now = new Date();
    var ampm = false;
    if (format.search(/{ampm}/) > -1) {
        format = format.replace(/{ampm}/g, global_getDate.getAMPM());
        ampm = true;
    }
    if (format.search(/{dd}/) > -1) format = format.replace(/{dd}/g, global_getDate.getDay());
    if (format.search(/{DD}/) > -1) format = format.replace(/{DD}/g, global_getDate.getDay(days));
    if (format.search(/{mm}/) > -1) format = format.replace(/{mm}/g, global_getDate.getMonth());
    if (format.search(/{MM}/) > -1) format = format.replace(/{MM}/g, global_getDate.getMonth(month));
    if (format.search(/{yyyy}/) > -1) format = format.replace(/{yyyy}/g, global_getDate.getYear(true));
    if (format.search(/{yy}/) > -1) format = format.replace(/{yy}/g, global_getDate.getYear(false));
    if (format.search(/{hh}/) > -1) format = format.replace(/{hh}/g, global_getDate.getHours(ampm));
    if (format.search(/{mi}/) > -1) format = format.replace(/{mi}/g, global_getDate.getMinutes());
    if (format.search(/{ss}/) > -1) format = format.replace(/{ss}/g, global_getDate.getSeconds());
    return format;
};
global_getDate.getDay = function(days) {
    var result = '';
    if (typeOf(days) == 'array') {
        result = days[global_getDate.now.getDay()];
    } else {
        result = global_getDate.now.getDate();
        if (result.length < 10) result = '0' + result;
    }
    return result;
};
global_getDate.getMonth = function(month) {
    var result = '';
    if (typeOf(month) == 'array') {
        result = month[global_getDate.now.getMonth()];
    } else {
        result = global_getDate.now.getMonth() + 1;
        if (result < 10) result = '0' + result;
    }
    return result;
};
global_getDate.getYear = function(full) {
    var result = '';
    result = global_getDate.now.getFullYear();
    if (!full) result = '\'' + (result.toString()).substring(2, 4);
    return result;
};
global_getDate.getHours = function(ampm) {
    var result = '';
    result = global_getDate.now.getHours();
    if (ampm && result > 12) result -= 12;
    if (result < 10) result = '0' + result;
    return result;
};
global_getDate.getMinutes = function() {
    var result = '';
    result = global_getDate.now.getMinutes();
    if (result < 10) result = '0' + result;
    return result;
};
global_getDate.getSeconds = function() {
    var result = '';
    result = global_getDate.now.getSeconds();
    if (result < 10) result = '0' + result;
    return result;
};
global_getDate.getAMPM = function() {
    var result = '';
    if (global_getDate.now.getHours() > 12) result = 'pm';
    else result = 'am';
    return result;
};
/* Date-Tool end */

var log_misc = function(log_ident) {
    var request = new Request({
        'method': 'get',
        'url': '../cgi-bin/global.pl?todo=log_misc&ident=' + log_ident
    }).send();
};

/* Log Misc */
log = {};
log.settings = {
    'url': '../cgi-bin/global.pl',
    'params': {
        'ident': 'pi_42_reg_half',
        'todo': 'log_misc'
    }
};
log.send = function(settings) {
    if (typeof(settings) == 'object') {
        log.settings = settings;
        log.request();
    }
};
log.request = function() {
    var temp_params = "";
    Object.each(log.settings.params, function(value, key) {
        temp_params += key + '=' + value + '&';
    });
    temp_params = temp_params.replace(/&$/gi, '');
    var temp_request = new Request({
        url: log.settings.url
    }).send(temp_params);
};

/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
*/
(function(q,m){"function"===typeof define&&define.amd?define(m):"object"===typeof exports?module.exports=m():q.Blazy=m()})(this,function(){function q(b){var c=b._util;c.elements=E(b.options);c.count=c.elements.length;c.destroyed&&(c.destroyed=!1,b.options.container&&l(b.options.container,function(a){n(a,"scroll",c.validateT)}),n(window,"resize",c.saveViewportOffsetT),n(window,"resize",c.validateT),n(window,"scroll",c.validateT));m(b)}function m(b){for(var c=b._util,a=0;a<c.count;a++){var d=c.elements[a],e;a:{var g=d;e=b.options;var p=g.getBoundingClientRect();if(e.container&&y&&(g=g.closest(e.containerClass))){g=g.getBoundingClientRect();e=r(g,f)?r(p,{top:g.top-e.offset,right:g.right+e.offset,bottom:g.bottom+e.offset,left:g.left-e.offset}):!1;break a}e=r(p,f)}if(e||t(d,b.options.successClass))b.load(d),c.elements.splice(a,1),c.count--,a--}0===c.count&&b.destroy()}function r(b,c){return b.right>=c.left&&b.bottom>=c.top&&b.left<=c.right&&b.top<=c.bottom}function z(b,c,a){if(!t(b,a.successClass)&&(c||a.loadInvisible||0<b.offsetWidth&&0<b.offsetHeight))if(c=b.getAttribute(u)||b.getAttribute(a.src)){c=c.split(a.separator);var d=c[A&&1<c.length?1:0],e=b.getAttribute(a.srcset),g="img"===b.nodeName.toLowerCase(),p=(c=b.parentNode)&&"picture"===c.nodeName.toLowerCase();if(g||void 0===b.src){var h=new Image,w=function(){a.error&&a.error(b,"invalid");v(b,a.errorClass);k(h,"error",w);k(h,"load",f)},f=function(){g?p||B(b,d,e):b.style.backgroundImage='url("'+d+'")';x(b,a);k(h,"load",f);k(h,"error",w)};p&&(h=b,l(c.getElementsByTagName("source"),function(b){var c=a.srcset,e=b.getAttribute(c);e&&(b.setAttribute("srcset",e),b.removeAttribute(c))}));n(h,"error",w);n(h,"load",f);B(h,d,e)}else b.src=d,x(b,a)}else"video"===b.nodeName.toLowerCase()?(l(b.getElementsByTagName("source"),function(b){var c=a.src,e=b.getAttribute(c);e&&(b.setAttribute("src",e),b.removeAttribute(c))}),b.load(),x(b,a)):(a.error&&a.error(b,"missing"),v(b,a.errorClass))}function x(b,c){v(b,c.successClass);c.success&&c.success(b);b.removeAttribute(c.src);b.removeAttribute(c.srcset);l(c.breakpoints,function(a){b.removeAttribute(a.src)})}function B(b,c,a){a&&b.setAttribute("srcset",a);b.src=c}function t(b,c){return-1!==(" "+b.className+" ").indexOf(" "+c+" ")}function v(b,c){t(b,c)||(b.className+=" "+c)}function E(b){var c=[];b=b.root.querySelectorAll(b.selector);for(var a=b.length;a--;c.unshift(b[a]));return c}function C(b){f.bottom=(window.innerHeight||document.documentElement.clientHeight)+b;f.right=(window.innerWidth||document.documentElement.clientWidth)+b}function n(b,c,a){b.attachEvent?b.attachEvent&&b.attachEvent("on"+c,a):b.addEventListener(c,a,{capture:!1,passive:!0})}function k(b,c,a){b.detachEvent?b.detachEvent&&b.detachEvent("on"+c,a):b.removeEventListener(c,a,{capture:!1,passive:!0})}function l(b,c){if(b&&c)for(var a=b.length,d=0;d<a&&!1!==c(b[d],d);d++);}function D(b,c,a){var d=0;return function(){var e=+new Date;e-d<c||(d=e,b.apply(a,arguments))}}var u,f,A,y;return function(b){if(!document.querySelectorAll){var c=document.createStyleSheet();document.querySelectorAll=function(a,b,d,h,f){f=document.all;b=[];a=a.replace(/\[for\b/gi,"[htmlFor").split(",");for(d=a.length;d--;){c.addRule(a[d],"k:v");for(h=f.length;h--;)f[h].currentStyle.k&&b.push(f[h]);c.removeRule(0)}return b}}var a=this,d=a._util={};d.elements=[];d.destroyed=!0;a.options=b||{};a.options.error=a.options.error||!1;a.options.offset=a.options.offset||100;a.options.root=a.options.root||document;a.options.success=a.options.success||!1;a.options.selector=a.options.selector||".b-lazy";a.options.separator=a.options.separator||"|";a.options.containerClass=a.options.container;a.options.container=a.options.containerClass?document.querySelectorAll(a.options.containerClass):!1;a.options.errorClass=a.options.errorClass||"b-error";a.options.breakpoints=a.options.breakpoints||!1;a.options.loadInvisible=a.options.loadInvisible||!1;a.options.successClass=a.options.successClass||"b-loaded";a.options.validateDelay=a.options.validateDelay||25;a.options.saveViewportOffsetDelay=a.options.saveViewportOffsetDelay||50;a.options.srcset=a.options.srcset||"data-srcset";a.options.src=u=a.options.src||"data-src";y=Element.prototype.closest;A=1<window.devicePixelRatio;f={};f.top=0-a.options.offset;f.left=0-a.options.offset;a.revalidate=function(){q(a)};a.load=function(a,b){var c=this.options;void 0===a.length?z(a,b,c):l(a,function(a){z(a,b,c)})};a.destroy=function(){var a=this._util;this.options.container&&l(this.options.container,function(b){k(b,"scroll",a.validateT)});k(window,"scroll",a.validateT);k(window,"resize",a.validateT);k(window,"resize",a.saveViewportOffsetT);a.count=0;a.elements.length=0;a.destroyed=!0};d.validateT=D(function(){m(a)},a.options.validateDelay,a);d.saveViewportOffsetT=D(function(){C(a.options.offset)},a.options.saveViewportOffsetDelay,a);C(a.options.offset);l(a.options.breakpoints,function(a){if(a.width>=window.screen.width)return u=a.src,!1});setTimeout(function(){q(a)})}});

/* returns the encoding type of the document defined in META tag [default = 'UTF-8'] */
var get_enc_type = function() {
    var enc_type = 'UTF-8';
    var meta = $$('meta[http-equiv=Content-Type]')[0];
    if (meta != null) {
        enc_type = meta.get('content').split('charset=')[1];
    }
    return enc_type;
};

// nothanks compatibility function - exit link should be used
// var noThanks = function(url) {
//     exit_link.fade_page(url);
// };

var isIE = function(version) {
    var regex = new RegExp('MSIE ' + version + '\.0');
    if (navigator.userAgent.search(regex) > -1) {
        return true;
    } else {
        return false;
    }
};

/* Smooth-scroll an element into view
 * target_element [required]
 * duration [optional]: Duration of animation [default is 500ms]
 * events: start_scrolling, end_scrolling (target: window) */
var scroll_into_view = (function() {
    var is_running = false;

    var interpolate = function(source, target_y, pos) {
        return (source + (target_y - source) * pos);
    };

    var easing = function(pos) {
        return (-Math.cos(pos * Math.PI) / 2) + 0.5;
    };

    var scroll = function(target_element, duration) {
        if (is_running == false) {
            $(window).fireEvent('start_scrolling', target_element);
            is_running = true;
            duration = duration || 500;

            var startY = document.documentElement.scrollTop || document.body.scrollTop,
                start = Number(new Date()),
                finish = start + duration,
                target_y = parseInt(target_element.getPosition().y);

            var interval = setInterval(function() {
                var now = Number(new Date()),
                    pos = (now > finish) ? 1 : (now - start) / duration;

                scrollTo(0, interpolate(startY, target_y, easing(pos)));

                if (now > finish) {
                    clearInterval(interval);
                    is_running = false;
                    $(window).fireEvent('end_scrolling', target_element);
                }
            }, 15)
        }
    };

    return {
        start: scroll
    };
}());

/* makes all elements with defined class name blink */
var Blink_items = function(options) {
    this.defaults = {
        speed: 500,
        element_class: 'blink_item_class',
        hide_class: 'hidden'
    };

    this.init = function(options) {
        var self = this;
        self.options = (typeof options !== 'object') ? self.defaults : Object.merge(self.defaults, options);
        self.blink();
    };

    this.blink = function() {
        var self = this;
        $$('.' + self.options.element_class).toggleClass(self.options.hide_class);
        setTimeout(function() {
            self.blink();
        }, self.options.speed);
    };

    this.init(options);
};

/* Creates a countdown
 * usage: $('element').countdown(options);
 * options:
 *      duration: 60000,                        // Coutdown Duration / ms
 *      output_scheme: '%min%:%sec%:%msex%',    // How to display the countdown;
                                                // %min% = min, %sec% = sec, %msec% = msec
 *      start_delay: 0,                         // delay before the countdown starts / ms
 *      on_complete: fn                         // function to execute when countdown finishes
 */
Element.implement({
    countdown: function(options) {
        var self = this;
        var _defaults = {
            duration: 60000,
            output_scheme: '%min%:%sec%',
            start_delay: 0,
            on_complete: function() {}
        };
        var _options,
            _interval,
            _milliseconds_str,
            _seconds_str,
            _minutes_str,
            _current_date,
            _end_date,
            _output_string;

        // puclic proporties
        self.milliseconds;
        self.seconds;
        self.minutes;
        self.remaining_time; // Date Object

        var _init = function(options) {
            _options = (typeof options !== 'object') ? _defaults : Object.merge(_defaults, options);
            _start();
        };

        var _count = function() {
            self.remaining_time = _current_date = new Date(_end_date - new Date());

            if (_current_date.getTime() >= 0) {
                self.milliseconds = _current_date.getMilliseconds();
                self.seconds = _current_date.getSeconds();
                self.minutes = _current_date.getMinutes();

                _milliseconds_str = ((self.milliseconds < 100) ? '0' : '') + Math.floor(self.milliseconds / 10).toString();
                _seconds_str = ((self.seconds < 10) ? '0' : '') + self.seconds.toString();
                _minutes_str = ((self.minutes < 10) ? '0' : '') + self.minutes.toString();

                _output();
            } else {
                _stop();
                if (typeof _options.on_complete === 'function') {
                    Function.attempt(_options.on_complete);
                }
            }
        };

        var _output = function() {
            _output_string = _options.output_scheme.replace('%min%', _minutes_str).replace('%sec%', _seconds_str).replace('%msec%', _milliseconds_str);
            self.set('html', _output_string);
        };

        var _start = function() {
            setTimeout(function() {
                _end_date = new Date(new Date().getTime() + _options.duration);
                _interval = setInterval(function() {
                    _count();
                }, 10);
            }, _options.start_delay);
        };

        var _stop = function() {
            _output();
            clearInterval(_interval);
        };

        this.stop = _stop;

        _init(options);
    }
});

/* save page impressions in log misc */
var log_page_impressions = (function() {
    var self = this;
    self.logged_pages = [];

    self.send = function(wingame_pk, page_name) {
        if (wingame_pk != undefined && page_name != undefined) {

            var cleaned_page_name = clean(page_name);

            if (self.logged_pages.contains(page_name) == false) {
                var req = new Request({
                    'url': '../cgi-bin/global.pl?ident=pi_' + wingame_pk + '_' + cleaned_page_name + '&todo=log_misc',
                    'method': 'get',
                    onSuccess: function() {
                        self.logged_pages.push(cleaned_page_name);
                        window.fireEvent('save_page_impression');
                    }
                }).send();
            }
        }
    };

    self.clean = function(page_name) {
        return (page_name.match(/^page_/) !== null) ? page_name.split('page_')[1] : page_name;
    };

    return this;
}());

/* Virtual Page Controller
 * public fn:
 * show_next_page: show element with index + 1
 * show_previous_page: show element with index - 1
 * show_page_by_index: show element with specific index (params: index) */
Element.implement({
    virtual_pages: function(options) {
        var self = this;
        var _defaults = {
            page_class: 'virtual_page', // element class of virtual pages
            hide_class: 'hidden', // element class used to hide pages
            active_class: 'active', // element class applied to the active page
            start_index: 0 // index of the 1st virtual page element
        };
        var _options;
        self.current_index;

        var _init = function() {
            window.addEvent('domready', function() {
                if ($$('.virtual_page').length > 1) {
                    _options = (typeof options !== 'object') ? _defaults : Object.merge(_defaults, options);
                    self.current_index = _options.start_index;

                    /* go to page index if passed */
                    if (get_parameter('page') != '') {
                        self.current_index = get_parameter('page');
                        self.show_page_by_index(self.current_index);
                    }
                }
            });
        };

        var _index_exists = function(_next_index) {
            if (_next_index > $$('.' + _options.page_class).length - 1) {
                $(window).fireEvent('last_page_complete');
                return false;
            } else if (_next_index < 0) {
                $(window).fireEvent('first_page');
                return false;
            }
            return true;
        };

        var _toggle_pages = function() {
            $$('.' + _options.page_class).removeClass(_options.active).addClass(_options.hide_class);
            $$('.' + _options.page_class)[self.current_index].addClass(_options.active).removeClass(_options.hide_class);
            $(window).fireEvent('page_change', self.current_index);
        };

        self.show_next_page = function() {
            if (_index_exists(self.current_index + 1) == true) self.current_index++;
            _toggle_pages();
        };

        self.show_previous_page = function() {
            if (_index_exists(self.current_index - 1) == true) self.current_index--;
            _toggle_pages();
        };

        self.show_page_by_index = function(index) {
            if (_index_exists(index) == true) {
                self.current_index = index;
                _toggle_pages();
            }
        };

        _init(options);
    }
});

Element.implement({
    process_bar: function(options) {
        var self = this;
        var _defaults = {
            bar_class: 'bar', // element class of a bar
            active_class: 'active', // element class for active elements
            speed: 100, // duration for each bar element
            loops: 5, // 0 = infinite
            loop_delay: 100,
            on_loop_complete: function() {},
            on_process_complete: function() {}
        };
        var _options,
            _loop_interval;
        var _current_index = 0;
        self.loops_completed = 1;

        var _init = function() {
            _options = (typeof options !== 'object') ? _defaults : Object.merge(_defaults, options);
            _run();
        };

        var _run = function() {
            _loop_interval = setInterval(function() {
                if (_current_index + 1 > self.getElements('.' + _options.bar_class).length) {
                    self.stop();

                    if (_options.loops == 0 || self.loops_completed + 1 <= _options.loops) {
                        if (typeof _options.on_loop_complete === 'function') {
                            Function.attempt(_options.on_loop_complete.bind(self));
                        }
                        self.loops_completed++;
                        setTimeout(function() {
                            _reset();
                            _run();
                        }, _options.loop_delay);
                    } else {
                        if (typeof _options.on_process_complete === 'function') {
                            Function.attempt(_options.on_process_complete.bind(self));
                        }
                    }
                } else {
                    self.getElements('.' + _options.bar_class)[_current_index].addClass(_options.active_class);
                    _current_index++;
                }
            }, _options.speed);
        };

        var _reset = function() {
            self.getElements('.' + _options.bar_class).removeClass(_options.active_class);
            _current_index = 0;
        };

        self.stop = function() {
            clearInterval(_loop_interval);
        };

        _init(options);
    }
});

/* Field Jumper - jumps from a input text to the next in the array */
var field_jumper = function(queue) {
    try {
        queue.each(function(element_id) {
            $(element_id).addEvent('keyup', function() {

                var input_maxlength = $(element_id).get('maxlength') || 9999,
                    input_value = $(element_id).get('value');

                if(input_value.length >= input_maxlength) {
                    $(element_id).set('value', input_value.substr(0, input_maxlength));
                    var next_index = queue.indexOf(element_id) + 1;
                    if(next_index < queue.length) {
                        $(queue[next_index]).focus();
                    } else if(next_index == queue.length) {
                        $(queue[next_index - 1]).blur();
                    }
                }
            });
        });
    } catch (error) { console.log(error) }
};

// backbutton redirect
var backwards_button = function (){
    'use strict';
    var self;
    this.init = function() {
        self = this;
        self.active = false;
        self.backwards_object = '';
        self.URL = '';
        self.mapper = {};
        self.check_POPUNDER(window.POPUNDER);
    };
    this.check_POPUNDER = function(POPUNDER){
        if(typeOf(POPUNDER) == 'object') {
            self.backwards_object = POPUNDER.browser_backwards_button;
            if(self.backwards_object){
                if(Object.keys(POPUNDER.browser_backwards_button).length > 0){
                    Object.each(POPUNDER.browser_backwards_button, function(value, key){
                        self.URL = value.url;
                        if(value.targeting){
                            self.mapper[value.targeting.gender] = value.url;
                        }
                    });
                    self.active = true;
                    self.add_Events();
                }
            }
        }
    };
    this.add_Events = function(){
        var current_url = location.href.replace("#!/tempURL",'');
        history.replaceState(null, document.title, current_url+"#!/tempURL");
        history.pushState(null, document.title, current_url);
        if(self.active === true){
            window.addEventListener("popstate", function() {
                if(Object.keys(self.mapper).length > 0 && $$('input[name="gender"]:checked').get('value').length == 1){
                    Object.each(self.mapper, function(value, key){
                        if(key == $$('input[name="gender"]:checked').get('value')[0]){
                            self.URL = value;
                        }
                    });
                }
                if(location.hash == "#!/tempURL") {
                    history.replaceState(null, document.title, current_url);
                    setTimeout(function(){
                        location.replace(self.URL);
                    },0);
                }
            }, false);
        }
    };
    this.init();
};

/*touchMouse Event*/
var trackEvent = (function () {
    try {
        var bodyFormIds = ['_reg_half', '_reg_full'];
        var mouseTouchEvent = ['keydown:ke', 'click:cl', 'contextmenu:cm', 'dblclick:dbc', 'mousemove:mm', 'mouseover:mo', 'select:se', 'touchend:te', 'touchmove:tm', 'touchstart:ts'];

        window.addEvent('domready', function () {
            var bodyId = null;
            if (document.getElementsByTagName('body').length > 0) {
                bodyId = document.getElementsByTagName('body')[0].id;
            }

            var currentId = bodyFormIds.filter(function (element) {
                if ((bodyId != null) && bodyId.match(element)) {
                    return element;
                }
            });

            var currentBody = $('page'+currentId[0]);
            var currentForm = $$('form#form'+currentId[0]+'')[0] || $$('form#form_reg_both')[0];
            var inputId = "us_m";

            if (currentBody && currentForm) {
                mouseTouchEvent.forEach(function (element,index) {
                    currentBody.addEvent(mouseTouchEvent[index].split(':')[0], function (event) {
                        var whichEvent = event.type;
                        if (event && whichEvent) {
                            var eventAmout = 1;
                            var eventValue = mouseTouchEvent[index].split(':')[1];
                            if (typeof eventValue !== "undefined" && eventValue.length) {
                                if ($(inputId)) {
                                    var eventToMatch = new RegExp(''+eventValue+'', 'g');
                                    var valueToEdit = $(inputId).get('value');
                                    if (typeof valueToEdit !== "undefined" && valueToEdit.length) {
                                        if (valueToEdit.match(eventToMatch) !== null) {
                                            var jsonValueToEdit = JSON.parse(valueToEdit);
                                            eventAmout = parseInt(jsonValueToEdit[eventValue])+1;
                                            $(inputId).setAttribute("value", valueToEdit.replace('"'+eventValue+'":'+jsonValueToEdit[eventValue],'"'+eventValue+'":'+eventAmout));
                                        } else {
                                            $(inputId).setAttribute("value", valueToEdit.replace('}',','+'"'+eventValue+'"'+':1}'));
                                        }
                                    }
                                } else {
                                    $(currentForm).appendHTML('<input type="hidden" id="us_m" name="us_m" value="{&quot;'+eventValue+'&quot;:'+eventAmout+'}">', 'top');
                                }
                            }
                        }
                    });
                });

                var wingame_pk = $$('input[name=wingame_pk]')[0].get('value');
                var freetest_pk = $$('input[name=freetest_pk]')[0].get('value');
                var page = bodyId;
                if(page === 'page_reg_full'){
                    window.addEventListener('beforeunload', function (e) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', 'global.pl?todo=log_misc&ident1=page_leave_'+wingame_pk+'_'+freetest_pk+'_'+page, true);
                        xhr.send();
                    });
                }
            }
        });
    }
    catch (error) {}
}());

/*  allow the Go button, in the keyboard, to proceed to the next page */
var goToNextPageByGoButton = function () {
    try {
        window.addEvent('domready', function () {
            var bodyId = $$('body[id^=page_reg_]')[0];
            var pageForm = $$('form[id^=form_reg_]')[0];
            var submitFormButton = $$('[id^=submit_reg_]')[0];

            if (bodyId && pageForm && submitFormButton) {
                $$('form[id^=form_reg_] input').addEvent('keydown', function (event) {
                    var keyCode = event.code || event.event.keyCode || event.event.which;
                    if (keyCode == 13) {
                        submitFormButton.click();
                        return false;
                    }
                });
            }
        });
    }
    catch (error) {}
};

/* remove emoticons from input/text Area by Multicoreg on Blur */
window.addEvent('domready', function () {
    var multicoregBodyId = null;
    if (document.getElementsByTagName('body').length > 0) {
        multicoregBodyId = document.getElementsByTagName('body')[0].id;
    }

    if (multicoregBodyId && multicoregBodyId === 'page_multicoreg') {
        $$('input, textarea').each(function (element) {
            if(['email', 'password', 'tel', 'text', 'number'].contains(element.get('type')) === true || element.get('tag') === 'textarea') {
                element.addEvents({
                    // bind blur by element
                    'blur': function (event) {
                        if (element.value && element.value.length > 0) {
                            element.value = element.value.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, '');
                        }
                    }
                });
            }
        });
    }
});

var appendScript = function(sScriptName, aPages) {
    var d = document;
    var body = d.getElementsByTagName('body')[0];
    var sPageId = body ? body.getAttribute('id') : null;
    var aCurrentId = aPages.filter( function (element) {
        if ((sPageId != null) && sPageId.match(element)) {
            return element;
        }
    });

    if (aCurrentId.length != 0) {
        var script = d.createElement('script');
        script.type = 'text/javascript';
        script.src = sScriptName;
        d.getElementsByTagName('body')[0].appendChild(script);
    }
};

var ab = {
    // get hidden fields from DOM,
    readHF: function() {
        if ($('_vs')) {
            return JSON.decode(ab.decode($('_vs').getProperty('value')));
        }

        return {};
    },
    /* get value of hidden field */
    getHF: function(fieldName) {
        var tmpHF = ab.readHF();
        if (fieldName in tmpHF) {
            return tmpHF[fieldName];
        } else {
            return false;
        }
    },
    /* set hidden field & update global var */
    setHF: function(fieldName, value) {
        if ($('_vs') && value !== undefined) {
            var tmpHF = ab.readHF();
            tmpHF[fieldName] = value;
            // encode & update hidden field
            $('_vs').setProperty('value', ab.encode(JSON.encode(tmpHF)));
            return ab.readHF()[fieldName];
        } else {
            return false;
        }
    },
    /* delete hidden field */
    delHF: function(fieldName) {
        var tmpHF = ab.readHF();
        if (fieldName in tmpHF) {
            delete tmpHF[fieldName];
            // encode & update hidden field
            $('_vs').setProperty('value', ab.encode(JSON.encode(tmpHF)));
            return true;
        } else {
            return false;
        }
    },
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = ab._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) +
                this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = ab._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) <<
                    6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
};
