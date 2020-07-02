window.addEvent('domready', function() {
	/* mapper defines which anchor tags open in either iframe or layer */
	new iframe_selector({
		selectors: {
			'.formrow_optin .poplink': {
				'type': 'iframe'
			},
			'#footer': {
				'type': 'iframe'
			}
		}
	});

	add_pop_iframe_closer_events();

	if(current_page == 'page_pregame') {
		initialize_quiz();
	}

	if (current_page == 'page_reg_half') {
		var optinlayer = new Optin_layer({
			form_id: 'form_reg_half'
		});

		$$('.formrow_title label').addEvent('click', function() {
			$$('.formrow_title label').removeClass('active');
			$(this).addClass('active');
		});

			mooli = new Moolidator_Lite({
			'form_id': 'form_reg_half',
			'debug' : false,
			'submit_button_id': 'submit_reg_half',
			'rules': moolidator_lite_rules,
			'countries': moolidator_lite_countries
		});
		mooli.addEvents({
			'moolidator_lite_submit': function() {
                if(optinlayer.test_checkboxes() === false) {
                    optinlayer.show();
                } else {
                    if(page_submitted === false) {
                        page_submitted = true;
                        if (popunder_on_submit('halfreg') === false) {
                            $('form_reg_half').submit();
                        }
                    }
                }
                return false;
            }
		});

		mooli.options.rules['default'].wingame_special_agb2 = {};
        mooli.options.rules['default'].wingame_special_agb2 = mooli.options.rules['default'].agb;
		mooli.options.rules['default'].firstname.negative.push(/^Nome$/i);
        mooli.options.rules['default'].lastname.negative.push(/^Cognome$/i);
		mooli.options.rules['default'].city.negative.push(/^LocalitÃ $/i);
		
		agb_error_handling();
        control_form.initialize();
	}

	if(current_page == 'page_reg_full') {
		if ($$('#optin_layer').length > 0) {
			var optinlayer = new Optin_layer({
				form_id: 'form_reg_full'
			});
		}
		
		$$('.formrow_title label').addEvent('click', function() {
			$$('.formrow_title label').removeClass('active');
			$(this).addClass('active');
		});
		
		// $('zipcode').addEvent('input', function() {
		// 	if($('country').get('value') == 1 && $('zipcode').get('value').search(mooli.options.rules.de.zipcode.positive[0]) > -1) {
		// 		getCityByZipcode($('zipcode').get('value'));
		// 	}
		// });	

		$$('select').each(function(el) {
			if(el.get('data-value')) {
			  el.set('value', el.get('data-value'));
			}
		  });   
	
		mooli = new Moolidator_Lite({
			'form_id': 'form_reg_full',
			'submit_button_id': 'submit_reg_full',
			'rules': moolidator_lite_rules,
			'countries': moolidator_lite_countries
		});
		mooli.addEvents({
            'moolidator_lite_submit': function() {
                if(page_submitted === false) {
                    page_submitted = true;
                    if (popunder_on_submit('fulreg') === false) {
                        $('form_reg_full').submit();
                    }
                }
            }
		});

		mooli.options.rules.it.street.negative.push(/^Nome via$/i);
		
	}
});

var agb_error_handling = function() {
	// Error Handling for AGB and AGB2

	var agb = $('agb'),
		agb2 = $('agb2');

	$('submit_reg_half').addEvent('click', check_agb_errors);

	agb.addEvent('click', check_agb_errors);
	agb2.addEvent('click', check_agb_errors);

	// AGB clickbox
	agb.addEvent('click', function() {
		if(agb.get('checked') === false) {
			agb2.set('checked', false);
			agb2.fireEvent('click');
		} else {
			$$('.status_agb')[0].removeClass('mooli_error');
		}
		return true;
	});

	// AGB 2 clickbox
	agb2.addEvent('click', function() {
		if(agb2.get('checked') === true) {
			agb.set('checked', true);
			agb.fireEvent('click');
			$$('.status_wingame_special_agb2')[0].removeClass('mooli_error');
		}
		return true;
	});
};

var check_agb_errors = function() {
	if($('agb').get('checked') === false) {
		$$('.status_agb')[0].addClass('mooli_error');
	}
	if($('agb2').get('checked') === false) {
		$$('.status_wingame_special_agb2')[0].addClass('mooli_error');
	}
};
