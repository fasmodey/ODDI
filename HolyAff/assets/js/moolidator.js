// mOOlidator Lite - a mootools Inline Validator
// v1.103 - 03.03.2016 - christianh
//
// All changes have to be documented in the mOOlidator Wiki entry. Also a new Version number
// has to be assigned (equivalent the variable global_version), the date of change and the editor above updated.
var Moolidator_Lite = new Class({
	Implements: [Events, Options],

	options: {
		debug: false,
		form_id: '',
		submit_button_id: '',
		validate_class: 'validate',
		optional_class: 'optional',
		invalid_class: 'invalid',
		ignore_class: 'ignore',
		country_name: 'country',
		success_class: 'mooli_success',
		error_class: 'mooli_error',
		edit_class: 'mooli_edit',
        filled_class: 'mooli_filled',
		placeholder_class: 'placeholder',
		placeholder_attribute: 'data-placeholder',
		status_class_addition: 'status_',
		function_before_addition: '_before',
		function_after_addition: '_after',
		check_date: false,
		input_label: true,
		allow_paste: false,
		date_fields: ['dayofbirth', 'monthofbirth', 'yearofbirth'],
		single_input_fields: ['email', 'hidden', 'password', 'tel', 'text', 'number'],
        single_input_fields_emoticon_check: ['email', 'password', 'tel', 'text', 'number'],
		multiple_input_fields: ['checkbox', 'radio'],
		auto_complete: 'nope',
		rules: {},
		countries: {},
		recaptcha: {
			data:{
				'data-sitekey' : '',
				'data-callback': 'validate_recaptcha',
				'data-size' : 'invisible',
				'class' : 'g-recaptcha'
			},
			hidden_fields : {'wingame_special_recaptcha_visible':'false'},
			puzzle_visible : false,
			active : false,
			recaptcha_execute : function(){
				grecaptcha.execute();
			},
			recaptcha_reset : function(){
				grecaptcha.reset();
			},
			recaptcha_function : 'grecaptcha',
			recaptcha_key_error_class : 'grecaptcha-user-facing-error',
			recaptcha_response_field_id : 'g-recaptcha-response',
			recaptcha_hidden_field_id : 'wingame_special_recaptcha_visible'
		},
		browser : {
		    mobile: {
				MobileSafari: /Apple.*Mobile.*Safari/.test(navigator.userAgent),
				iOs: navigator.userAgent.indexOf('iPad') > -1 || navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPod') > -1,
				BlackBerry: navigator.userAgent.indexOf('BlackBerry') > -1,
				Fennec: navigator.userAgent.indexOf('Fennec') > -1,
				IEMobile: navigator.userAgent.indexOf('IEMobile') > -1,
				WindowsPhone: navigator.userAgent.toLowerCase().indexOf('windows phone') > -1,
				WindowsTablet: navigator.userAgent.toLowerCase().indexOf('windows nt') > -1 && navigator.userAgent.toLowerCase().indexOf('touch') > -1,
				OperaMobile: navigator.userAgent.search(/Opera (?:Mobi|Mini)/) > -1,
				Kindle: navigator.userAgent.search(/[ ](Kindle|Silk)/) > -1,
				Android: /Android/.test(navigator.userAgent),
				facebookWebview: /FBAV/.test(navigator.userAgent),
				googleWebview: /GSA/.test(navigator.userAgent),
				AndroidChromiumWebview: /Chrome\/.* Mobile/.test(navigator.userAgent),
				iOsWebview: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Version)/.test(navigator.userAgent)
			},
			desktop: {
				iOS67: navigator.userAgent.search(/OS 6(.*)|7(.*) like Mac OS/i) > -1,
				Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
				IE: !!(navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1),
				MSEdge: navigator.userAgent.indexOf('Edge/') > -1,
				Opera: Object.prototype.toString.call(window.opera) === '[object Opera]',
				WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
				Chrome: navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge/') === -1,
				isChromeIOS: /crios/i.test(navigator.userAgent)
			}
		},
		hidden_fields : {},
	},

	global_selected_country: 'default',
	global_functions: {},
	global_version: {
		'name': 'moolidator_lite',
		'version': '1.104'
	},
	

	// do not change these values unless you want moolidator to break down
	static_result_no_rule: 5,
	static_result_invalid: 4,
	static_result_valid: 3,
	static_result_optional: 2,
	static_result_validated: 1,
	static_result_not_validated: 0,

	initialize: function(options) {
		var _self = this;
		_self.console_log('##### Moolidator_Lite ' + _self.global_version.version + ' initializing: begin');
		if(Object.getLength(options.rules) > 0) {
			_self.setOptions(options);
			if(typeof recaptcha != "undefined" && typeOf(recaptcha) == "object"){
				_self.initialize_recaptcha(recaptcha);
			}
			_self.add_events_to_submit();
			_self.add_hidden_fields_to_form();
			var country_select = $$('select[name=' + _self.options.country_name +']');
			if(country_select.length > 0) {
				_self.add_events_to_country(country_select[0]);
			}
			var fields = _self.scan_fields();
			_self.add_events_to_object(fields);
			if(_self.options.input_label == true) {
				_self.initialize_input_label();
			}
		}

		_self.removeEmoticonFromInputField();

		_self.fireEvent('moolidator_lite_initialized');
		_self.console_log('##### Moolidator_Lite initializing: end');
	},

	initialize_input_label: function() {
		var _self = this;
		var fields = $$('input[type="text"]:not([data-placeholder=""])');
		fields.each(function(field) {
			_self.on_input_label_blur(field);
		});
	},
	
	initialize_recaptcha: function(recaptcha) {
		var _self = this;
		//check key error
		
		var merge = Object.merge(_self.options.recaptcha, recaptcha);
		_self.options.recaptcha = merge;
		_self.console_log('## ReCaptcha initializing: begin');
		var patt = /^{{/;
		if(_self.options.recaptcha.data['data-sitekey'] != '' && patt.test(_self.options.recaptcha.data['data-sitekey']) == false){
			var submit_button = $(_self.options.submit_button_id);
			if(typeOf(submit_button) == 'element') {
				var recaptcha_div = new Element('div');
				Object.each(_self.options.recaptcha.data, function(value,key) {
					recaptcha_div.set(key,value);
				});	
				recaptcha_div.inject(submit_button);
				var merge = Object.merge(_self.options.hidden_fields, _self.options.recaptcha.hidden_fields);
				_self.options.hidden_fields = merge;
				_self.options.recaptcha.active = true;
				_self.console_log('# ReCaptcha injected : '+_self.options.submit_button_id);
			}
		} else {
			_self.console_log('# ReCaptcha Not Set, reason: No data-sitekey');
		}
		_self.console_log('## ReCaptcha initializing: end');
	},
	
	

	scan_fields: function() {
		var _self = this;
		var fields = {};
		$$('.' + _self.options.validate_class).each(function(field) {
			if(field.get('tag') == 'input') {
				if(_self.options.single_input_fields.contains(field.get('type')) == true) {
					fields[field.get('name')] = field;
				} else {
					if(_self.options.multiple_input_fields.contains(field.get('type')) == true) {
						fields[field.get('name')] = $$('[name=' + field.get('name') + ']');
						if(fields[field.get('name')].length) {
							delete fields[field.get('name')].length;
						}
					}
				}
			} else {
				if(field.get('tag') == 'select' || field.get('tag') == 'textarea') {
					fields[field.get('name')] = field;
				}
			}
		});
		_self.console_log('### scan_fields: ' + Object.keys(fields));
		return fields;
	},

	add_events_to_submit: function() {
		var _self = this;
		var submit_button = $(_self.options.submit_button_id);
		if(typeOf(submit_button) == 'element') {
			submit_button.addEvents({
				'click': function(event) {
					if(_self.get_event_target(event).hasClass('ignore') == false) {
						if(_self.is_form_valid(event) == true) {
							if(_self.options.recaptcha.active === true && typeOf(window[_self.options.recaptcha.recaptcha_function]) == 'object' && $$('.'+_self.options.recaptcha.recaptcha_key_error_class).length == 0){
								_self.options.recaptcha.recaptcha_execute();
								_self.options.recaptcha.recaptcha_start = new Date().getTime();
								_self.options.recaptcha.event = event;
								_self.console_log('## ReCaptcha called');
							} else {
								_self.console_log('##### submit form: true');
								_self.fireEvent('moolidator_lite_submit', event);
							}
						} else {
							_self.console_log('##### submit form: false');
							_self.fireEvent('moolidator_lite_no_submit', event);
						}
						return false;
					}
				}
			});
			_self.console_log('### add_events_to_submit: true');
		}
	},

	add_events_to_country: function(element) {
		var _self = this;
		element.addEvents({
			'change': function() {
				_self.global_selected_country = element.get('value');
				_self.console_log('##### country set to: ' + _self.global_selected_country);
				_self.validate_form();
			}
		});
	},

	add_events_to_object: function(fields) {
		var _self = this;
		_self.console_log('### add_events_to_object: begin');
		Object.each(fields, function(elements) {
			if(typeOf(elements) == 'element') {
				_self.add_element_attributes(elements);
				_self.add_events_to_element(elements);
			} else {
				Object.each(elements, function(element) {
					_self.add_element_attributes(element);
					_self.add_events_to_element(element);
				});
			}
		});
		_self.console_log('### add_events_to_object: end');
	},

	add_events_to_element: function(element) {
		var _self = this;
		if(element.get('tag') == 'input') {
			if(_self.options.single_input_fields.contains(element.get('type')) == true) {
				element.addEvents({
					'keyup': function(event) {
						if(element.ml_result == _self.static_result_not_validated) {
							element.ml_result = _self.static_result_validated;
						}
						_self.on_check_date(this);
						_self.on_element_keyup(this, event);
					},
					'blur': function(event) {
						if (_self.options.auto_complete !== false) {
							element.removeAttribute('autocomplete');
						}
						if(element.ml_result == _self.static_result_not_validated) {
							element.ml_result = _self.static_result_validated;
						}
						_self.on_check_date(this);
						_self.on_element_blur(this, event);
						if(_self.options.input_label == true) {
							_self.on_input_label_blur(this, event);
						}
					},
					'focus': function(event) {
						if (_self.options.auto_complete !== false) {
							if (_self.options.browser.desktop.MSEdge) {
								_self.options.auto_complete = 'off';
							}
							element.setAttribute('autocomplete', _self.options.auto_complete);
						}
						if(_self.options.input_label == true) {
							_self.on_input_label_focus(this, event);
						}
						_self.on_element_focus(this, event);
					},
					'paste': function(event) {
						if(document.cookie.match(/oip=on/) === null && _self.options.allow_paste === false) {
							var previous_value = element.value;
							window.setTimeout(function() {
								element.value = previous_value;
							}, 1);
						}
					}
				});
                _self.is_field_filled(element);
			} else {
				if(_self.options.multiple_input_fields.contains(element.get('type')) == true) {
					element.addEvents({
						'click': function(event) {
							if(element.ml_result == _self.static_result_not_validated) {
								element.ml_result = _self.static_result_validated;
							}
							_self.on_element_click(this, event);
						}
					});
				}
			}
		} else {
			if(element.get('tag') == 'select') {
				element.addEvents({
					'change': function(event) {
						if(element.ml_result == _self.static_result_not_validated) {
							element.ml_result = _self.static_result_validated;
						}
						_self.on_check_date(this);
						_self.on_element_change(this, event);
					}
				});
			} else {
				if(element.get('tag') == 'textarea') {
					element.addEvents({
						'keyup': function(event) {
							if(element.ml_result == _self.static_result_not_validated) {
								element.ml_result = _self.static_result_validated;
							}
							_self.on_element_keyup(this, event);
						},
						'blur': function(event) {
							if(element.ml_result == _self.static_result_not_validated) {
								element.ml_result = _self.static_result_validated;
							}
							_self.on_element_blur(this, event);
						},
						'focus': function(event) {
							_self.on_element_focus(this, event);
						}
					});
				}
			}
		}
		_self.console_log('# add_events_to_element: ' + element.get('name'));
	},
	
	add_hidden_fields_to_form : function(){
		var _self = this;
		Object.each(_self.options.hidden_fields, function(value,field_name){
			if($$('input[name="'+field_name+'"]').length == 0){
				var field = new Element('input',{
					'type' : 'hidden',
					'name' : field_name,
					'id' : field_name,
					'value' : value
				}).inject($$('form')[0]);
				_self.console_log('# add_hidden_fields_to_form: ' + field_name);
			} else {
				_self.console_log('# add_hidden_fields_to_form not, field exist: ' + field_name);
			}
		});
		
	},

	is_field_filled: function(element) {
		var _self = this;
        if (element.get('value') == '') {
            element.removeClass(_self.options.filled_class);
        } else {
            element.addClass(_self.options.filled_class);
        }
	},

	add_element_attributes: function(element) {
		var _self = this;
		element.ml_validate = true;
		element.ml_result = _self.static_result_not_validated;
		if(_self.get_rules_for_element(element) == false) {
			element.ml_result = _self.static_result_no_rule;
		}
		_self.console_log('# add_element_attributes: ' + element.get('name'));
	},

	add_validation: function(element, optional) {
		var _self = this;
		_self.console_log('### add_validation: begin');
		element.addClass(_self.options.validate_class);
		if(optional == true) {
			element.addClass(_self.options.optional_class);
		}
		if(typeOf(element.ml_validate) == 'null') {
			_self.add_element_attributes(element);
			_self.add_events_to_element(element);
		}
		_self.console_log('### add_validation: end');
	},

	remove_validation: function(element) {
		var _self = this;
		element.removeClass(_self.options.validate_class);
		element.removeClass(_self.options.optional_class);
		if(typeOf(element.ml_validate) != 'null') {
			try {
				delete element.ml_validate;
			} catch(e) {
				element.ml_validate = 'null';
			}
		}
		_self.process_validation(element, _self.static_result_not_validated);
		_self.console_log('### remove_validation - name:' + element.get('name'));
	},

	add_function: function(function_name, function_position, function_code) {
		var _self = this;
		_self.global_functions[function_name + '_' + function_position] = function_code;
		_self.console_log('### add_function - name: ' + function_name + ' - position: ' + function_position);
	},

	remove_function: function(function_name, function_position) {
		var _self = this;
		delete _self.global_functions[function_name + '_' + function_position];
		_self.console_log('### remove_function - name: ' + function_name + ' - position: ' + function_position);
	},

	attempt_function: function(element, function_position) {
		var _self = this;
		var function_name = element.get('name') + function_position;
		if(Object.keys(_self.global_functions).contains(function_name) == true) {
			if(function_position == _self.options.function_before_addition) {
				_self.global_functions[element.get('name') + _self.options.function_before_addition].attempt(element);
			} else {
				_self.global_functions[element.get('name') + _self.options.function_after_addition].attempt(element);
			}
			_self.console_log('### attempt_function - name: ' + function_name);
		}
		var all_function_name = 'all' + function_position;
		if(Object.keys(_self.global_functions).contains(all_function_name) == true) {
			_self.global_functions[all_function_name].attempt(element);
			_self.console_log('### attempt_function - name: ' + all_function_name);
		}
	},

	on_element_keyup: function(element, event) {
		var _self = this;
		if(typeOf(element.ml_validate) != 'null' && _self.is_key_pressed(9, event) == false) {
            _self.is_field_filled(element);
			if(element.get('tag') == 'input') {
				return _self.validate_text(element);
			} else {
				return _self.validate_textarea(element);
			}
		}
	},

    // remove emoticons by on Blur
    removeEmoticonFromInputField: function() {
        var _self = this;

        $$('input').each(function (element) {
            if(_self.options.single_input_fields_emoticon_check.contains(element.get('type')) === true) {
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
    },

	on_element_blur: function(element) {
		// keyup is setting the same value as blur does
		var _self = this;

		if(typeOf(element.ml_validate) != 'null') {
			_self.hide_edit(element);
			var status = _self.get_status_element(element);
			if(status.length > 0) {
				_self.hide_edit(status[0]);
			}
			/*
			if(_self.validate_text(element) == _self.static_result_invalid && element.value != ''){
				if(element.error_value == undefined || element.value != element.error_value){
					element.error_value = element.value;
					var p_field = '';
					var participation_pk = $$('input[name=participation_pk]')[0].get('value');
					if(participation_pk != ''){
							p_field = '_'+participation_pk;
					}
					var wingame_pk = $$('input[name=wingame_pk]')[0].get('value');
					var freetest_pk = $$('input[name=freetest_pk]')[0].get('value');
					var xhr = new XMLHttpRequest();
					xhr.open('POST', 'global.pl?todo=log_misc&ident1=mool_'+wingame_pk+'_'+freetest_pk+'_'+element.name+p_field, true);
					xhr.send();
			
					if(element.name == 'email' && wingame_pk == 134 && freetest_pk == 395){
						var xhr = new XMLHttpRequest();
						xhr.open('POST', '/cgi-bin/global.pl?todo=tl&x=Oquoh1jo&h=' + rS + '&r=' + rI, true);
						xhr.send(JSON.stringify({
										"msg": "email-invalid: '"+element.value+ "' partner_pk="+$$('input[name=partner_pk]')[0].get('value')+" sub_id="+$$('input[name=sub_id]')[0].get('value'),
										"url": window.location.href,
										"referer": document.referrer,
										"page_id": document.getElementsByTagName('body')[0].id
						}));
					}
				}
			}*/
			
            _self.is_field_filled(element);
			if(element.get('tag') == 'input') {
				return _self.validate_text(element);
			} else {
				return _self.validate_textarea(element);
			}
		}
	},

	on_element_focus: function(element) {
		var _self = this;
		if(typeOf(element.ml_validate) != 'null') {
            _self.is_field_filled(element);
			if(element.ml_result != _self.static_result_no_rule) {
				_self.show_edit(element);
				var status = _self.get_status_element(element);
				if(status.length > 0) {
					_self.show_edit(status[0]);
				}
			}
		}
	},

	on_element_click: function(element) {
		var _self = this;
		if(typeOf(element.ml_validate != 'null')) {
			return _self.validate_radio_checkbox(element);
		}
	},

	on_element_change: function(element) {
		var _self = this;
		if(typeOf(element.ml_validate != 'null')) {
            _self.is_field_filled(element);
			return _self.validate_select(element);
		}
	},

	on_check_date: function(element) {
		var _self = this;
		if(_self.options.check_date == true) {
			if(_self.options.date_fields.contains(element.get('name'))) {
				var rule_result = _self.get_date_result(element);
				if(rule_result < _self.static_result_invalid) {
					if($$('[name=' + _self.options.date_fields[1] + ']')[0].ml_result > _self.static_result_not_validated) {
						_self.set_element_invalid($$('[name=' + _self.options.date_fields[1] + ']')[0], false);
					}
					if($$('[name=' + _self.options.date_fields[0] + ']')[0].ml_result > _self.static_result_not_validated) {
						_self.set_element_invalid($$('[name=' + _self.options.date_fields[0] + ']')[0], false);
					}
				} else {
					if($$('[name=' + _self.options.date_fields[1] + ']')[0].ml_result > _self.static_result_not_validated) {
						_self.set_element_invalid($$('[name=' + _self.options.date_fields[1] + ']')[0], true);
					}
					if($$('[name=' + _self.options.date_fields[0] + ']')[0].ml_result > _self.static_result_not_validated) {
						_self.set_element_invalid($$('[name=' + _self.options.date_fields[0] + ']')[0], true);
					}
				}
			}
		}
	},

	on_input_label_focus: function(element, event) {
		var _self = this;
		var placeholder = element.getProperty(_self.options.placeholder_attribute);
		if(typeOf(placeholder) != 'null' && placeholder != '') {
			if(element.get('value') == placeholder) {
				element.set('value', '');
			}
		}
		element.removeClass('placeholder');
	},

	on_input_label_blur: function(element, event) {
		var _self = this;
		var placeholder = element.getProperty(_self.options.placeholder_attribute);
		if(typeOf(placeholder) != 'null' && placeholder != '') {
			if(element.get('value') == '' || element.get('value').toLowerCase() == placeholder.toLowerCase()) {
				element.set('value', placeholder);
				element.addClass('placeholder');
			}
		}
	},

	validate_form: function(only_validated) {
		var _self = this;
		_self.console_log('##### validate_form: begin - only_validated: ' + only_validated);
		var fields = _self.scan_fields();
		Object.each(fields, function(elements) {
			if(typeOf(elements) == 'element') {
				if(elements.ml_result != _self.static_result_not_validated) {
					_self.validate_element(elements);
				}
			} else {
				Object.each(elements, function(element) {
					if(element.ml_result != _self.static_result_not_validated) {
						_self.validate_element(element);
					}
				});
			}
		});
		_self.console_log('##### validate_form: end');
	},

	validate_element: function(element) {
		var _self = this;
		var result = _self.static_result_invalid;
		if(element.get('tag') == 'input') {
			if(_self.options.single_input_fields.contains(element.get('type')) == true) {
				result = _self.on_element_blur(element);
			} else {
				if(_self.options.multiple_input_fields.contains(element.get('type')) == true) {
					result = _self.on_element_click(element);
				}
			}
		} else {
			if(element.get('tag') == 'select') {
				result = _self.on_element_change(element);
			} else {
				if(element.get('tag') == 'textarea') {
					result = _self.on_element_keyup(element);
				}
			}
		}
		return result;
	},

	validate_radio_checkbox: function(element) {
		var _self = this;
		var result = _self.static_result_valid;
        var checked_element = $$('[name=' + element.get('name') + ']:checked');
		var use_rules = _self.get_rules_for_element(element);
		_self.attempt_function(element, _self.options.function_before_addition);
		if(use_rules != false) {
			if(checked_element.length > 0) {
				Object.each(use_rules.positive, function(rule) {
					var check_element = checked_element[0];
					var rule_result = _self.get_rule_result(check_element.get('value'), rule, use_rules.trimming, true);
					if(rule_result == _self.static_result_invalid) {
						result = rule_result;
					}
					_self.console_log('# validate_radio_checkbox - name: ' + check_element.get('name') + ' - value: ' + check_element.get('value') + ' - use_rule: ' + rule + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
				});
				Object.each(use_rules.negative, function(rule) {
					var check_element = checked_element[0];
					var rule_result = _self.get_rule_result(check_element.get('value'), rule, use_rules.trimming, false);
					if(rule_result == _self.static_result_invalid) {
						result = rule_result;
					}
					_self.console_log('# validate_radio_checkbox - name: ' + check_element.get('name') + ' - value: ' + check_element.get('value') + ' - use_rule: ' + rule + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
				});
			} else {
				if(element.hasClass(_self.options.optional_class) == true) {
					result = _self.static_result_optional;
				} else {
					result = _self.static_result_invalid;
					_self.console_log('# validate_radio_checkbox - name: ' + element.get('name') + ' - value: ' + element.get('value') + ' - use_rule: not checked - result: ' + result);
				}
				checked_element = [element];
			}
		} else {
			result = _self.static_result_no_rule;
			if(checked_element.length == 0) {
				checked_element = [element];
			}
			_self.console_log('# validate_radio_checkbox - name: ' + checked_element[0].get('name') + ' - no rule set');
		}
		$$('[name=' + checked_element[0].get('name') + ']').each(function(radio_checkbox) {
			radio_checkbox.ml_result = result;
		});
		_self.process_validation(checked_element[0], result);
		_self.attempt_function(element, _self.options.function_after_addition);

        // Android bugfix
        $(document.body).addClass('__ml__').removeClass('__ml__');

        return result;
	},

	validate_text: function(element) {
		var _self = this;
		var result = _self.static_result_valid;
		var use_rules = _self.get_rules_for_element(element);
		_self.attempt_function(element, _self.options.function_before_addition);
		if(_self.options.input_label == true && element.get('value').trim() != '') {
			var placeholder = element.get(_self.options.placeholder_attribute);
			if(typeOf(placeholder) != 'null' && placeholder != '') {
				var placeholder_regexp = new RegExp('^' + placeholder + '$', 'i');
				var rule_result = _self.get_rule_result(element.get('value'), placeholder_regexp, [], false);
				if(rule_result == _self.static_result_invalid) {
					result = rule_result;
				}
				_self.console_log('# validate_text - name: ' + element.get('name') + ' - value: ' + element.get('value') + ' - placeholder_rule: ' + placeholder_regexp + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
			}
		}
		if(use_rules != false) {
			if(element.get('value').trim() != '') {
				Object.each(use_rules.positive, function(rule) {
					var rule_result = _self.get_rule_result(element.get('value'), rule, use_rules.trimming, true);
					if(rule_result == _self.static_result_invalid) {
						result = rule_result;
					}
					_self.console_log('# validate_text - name: ' + element.get('name') + ' - value: ' + element.get('value') + ' - use_rules: ' + rule + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
				});
				Object.each(use_rules.negative, function(rule) {
					var rule_result = _self.get_rule_result(element.get('value'), rule, use_rules.trimming, false);
					if(rule_result == _self.static_result_invalid) {
						result = rule_result;
					}
					_self.console_log('# validate_text - name: ' + element.get('name') + ' - value: ' + element.get('value') + ' - use_rules: ' + rule + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
				});
				/*if(_self.options.check_date == true) {
					if(_self.options.date_fields.contains(element.get('name'))) {
						var rule_result = _self.get_date_result(element);
						if(rule_result == _self.static_result_invalid) {
							result = rule_result;
						}
					}
				}*/
			} else {
				result = _self.static_result_invalid;
				_self.console_log('# validate_text - name: ' + element.get('name') + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - has no value');
			}
			if(result == _self.static_result_invalid) {
				if(element.hasClass(_self.options.optional_class) == true && element.get('value').trim() == '') {
					result = _self.static_result_optional;
				}
			}
		} else {
			if(_self.options.input_label == false) {
				result = _self.static_result_no_rule;
				_self.console_log('# validate_text - name: ' + element.get('name') + ' - no rule set');
			} else {
				if(typeOf(placeholder) == 'null' || placeholder == '') {
					result = _self.static_result_no_rule;
					_self.console_log('# validate_text - name: ' + element.get('name') + ' - no rule set');
				}
			}
		}
		element.ml_result = result;
		_self.process_validation(element, result);
		_self.attempt_function(element, _self.options.function_after_addition);
		return result;
	},

	validate_select: function(element) {
		var _self = this;
		var result = _self.static_result_valid;
		var use_rules = _self.get_rules_for_element(element);
		_self.attempt_function(element, _self.options.function_before_addition);
		if(use_rules != false) {
			var selected_options = element.getElements(':selected');
			if(element.hasClass(_self.options.optional_class) == true && selected_options.length == 1) {
				if(selected_options[0].get('value').trim() == '') {
					result = _self.static_result_optional;
				}
			} else {
				if(selected_options.length > 0) {
					selected_options.each(function(option) {
						Object.each(use_rules.positive, function(rule) {
							var rule_result = _self.get_rule_result(option.get('value'), rule, use_rules.trimming, true);
							if(rule_result == _self.static_result_invalid) {
								result = rule_result;
							}
							_self.console_log('# validate_select - name: ' + element.get('name') + ' - value: ' + option.get('value') + ' - use_rule: ' + rule + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
						});
						Object.each(use_rules.negative, function(rule) {
							var rule_result = _self.get_rule_result(option.get('value'), rule, use_rules.trimming, false);
							if(rule_result == _self.static_result_invalid) {
								result = rule_result;
							}
							_self.console_log('# validate_select - name: ' + element.get('name') + ' - value: ' + option.get('value') + ' - use_rule: ' + rule + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
						});
					});
					/*if(_self.options.check_date == true) {
						if(_self.options.date_fields.contains(element.get('name'))) {
							var rule_result = _self.get_date_result(element);
							if(rule_result == _self.static_result_invalid) {
								result = rule_result;
							}
						}
					}*/
				} else {
					result = _self.static_result_invalid;
					_self.console_log('# validate_select - name: ' + element.get('name') + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - nothing selected');
				}
			}
		} else {
			result = _self.static_result_no_rule;
			_self.console_log('# validate_select - name: ' + element.get('name') + ' - no rule set');
		}
		element.ml_result = result;
		_self.process_validation(element, result);
		_self.attempt_function(element, _self.options.function_after_addition);
		return result;
	},

	validate_textarea: function(element) {
		var _self = this;
		var result = _self.static_result_valid;
		var use_rules = _self.get_rules_for_element(element);
		_self.attempt_function(element, _self.options.function_before_addition);
		if(use_rules != false) {
			if(element.get('value').trim() != '') {
				Object.each(use_rules.positive, function(rule) {
					var rule_result = _self.get_rule_result(element.get('value'), rule, use_rules.trimming, true);
					if(rule_result == _self.static_result_invalid) {
						result = rule_result;
					}
					_self.console_log('# validate_textarea - name: ' + element.get('name') + ' - value: ' + element.get('value') + ' - use_rule: ' + rule + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
				});
				Object.each(use_rules.negative, function(rule) {
					var rule_result = _self.get_rule_result(element.get('value'), rule, use_rules.trimming, false);
					if(rule_result == _self.static_result_invalid) {
						result = rule_result;
					}
					_self.console_log('# validate_textarea - name: ' + element.get('name') + ' - value: ' + element.get('value') + ' - use_rule: ' + rule + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - result: ' + rule_result);
				});
			} else {
				result = _self.static_result_invalid;
				_self.console_log('# validate_text - name: ' + element.get('name') + ' - optional: ' + element.hasClass(_self.options.optional_class) + ' - has no value');
			}
			if(result == _self.static_result_invalid) {
				if(element.hasClass(_self.options.optional_class) == true && element.get('value').trim() == '') {
					result = _self.static_result_optional;
				}
			}
		} else {
			result = _self.static_result_no_rule;
			_self.console_log('# validate_textarea - name: ' + element.get('name') + ' - no rule set');
		}
		element.ml_result = result;
		_self.process_validation(element, result);
		_self.attempt_function(element, _self.options.function_after_addition);
		return result;
	},

	validate_date: function(date_string) {
		var _self = this;

		var date_array = date_string.split('-');
		var day = parseInt(date_array[2], 10);
		var month = parseInt(date_array[1], 10);
		var year = parseInt(date_array[0], 10);
		var date = new Date(year, month - 1, day);

		if(date.getFullYear() == year && date.getMonth() + 1 == month && date.getDate() == day) {
			_self.console_log('# validate_date: valid');
			return _self.static_result_valid;
		} else {
			_self.console_log('# validate_date: invalid');
			return _self.static_result_invalid;
		}
	},
	validate_recaptcha: function(token){
		var _self = this;
		_self.console_log('# validate Recaptcha');
		
		if(token == $(_self.options.recaptcha.recaptcha_response_field_id).value){
			//check, puzzle was visible
			$(_self.options.recaptcha.recaptcha_hidden_field_id).set('value',_self.check_recaptcha_puzzle());
			_self.console_log('##### submit form: true');
			_self.fireEvent('moolidator_lite_submit', _self.options.recaptcha.event);
			return true;
		}
		//reset the recaptcha
		_self.options.recaptcha.recaptcha_reset();
		return false;
	},
	
	check_recaptcha_puzzle: function() {
		var _self = this;
		
		if(Math.round(new Date().getTime() - _self.options.recaptcha.recaptcha_start) > 2000 ){
			_self.options.recaptcha.puzzle_visible = true;
		}
		_self.console_log('# ReCaptcha puzzle visible: '+ _self.options.recaptcha.puzzle_visible);
		return _self.options.recaptcha.puzzle_visible;
	},

	process_validation: function(element, result) {
		var _self = this;
		_self.switch_result(result, element);
		var status = _self.get_status_element(element);
		if(status.length > 0) {
			var grouped_elements = _self.get_grouped_elements(element);
			var group_result = _self.get_group_result(grouped_elements);
			status.each(function(status_element) {
				_self.switch_result(group_result, $(status_element));
			});
		}
        element.fireEvent('mooli_field_validation_complete', element);
	},

	switch_result: function(switch_value, element) {
		var _self = this;
		switch(switch_value) {
			case _self.static_result_not_validated:
				_self.show_nothing(element);
				break;
			case _self.static_result_optional:
				_self.show_nothing(element);
				break;
			case _self.static_result_valid:
				_self.show_success(element);
				break;
			case _self.static_result_invalid:
				_self.show_error(element);
				break;
			case _self.static_result_no_rule:
				_self.show_nothing(element);
				break;
		}
	},

	get_date_result: function(element) {
		var _self = this;
		var result = _self.static_result_valid;
		var date_set = [true, true, true];
		var date_data = new Array(3);
		date_data[0] = parseInt($$('[name=' + _self.options.date_fields[2] + ']')[0].get('value'));
		date_data[1] = parseInt($$('[name=' + _self.options.date_fields[1] + ']')[0].get('value'));
		date_data[2] = parseInt($$('[name=' + _self.options.date_fields[0] + ']')[0].get('value'));
		if(date_data[0] !== date_data[0]) {
			date_data[0] = 2001;
			date_set[0] = false;
		}
		if(date_data[1] !== date_data[1]) {
			date_data[1] = 1;
			date_set[1] = false;
		}
		if(date_data[2] !== date_data[2]) {
			date_data[2] = 1;
			date_set[2] = false;
		}
		date_data[1] = _self.pad_number(date_data[1], 2);
		date_data[2] = _self.pad_number(date_data[2], 2);

		result = _self.validate_date(date_data.join('-'));
		return result;
	},

	get_rule_result: function(value, rule, trimming, positive) {
		var _self = this;
		trimming.each(function(trim_rule) {
			value = value.replace(trim_rule, '');
		});
		var result = value.search(rule);
		if((positive == true && result == -1) || (positive == false && result > -1)) {
			result = _self.static_result_invalid;
		} else {
			result = _self.static_result_valid;
		}
		return result;
	},

	get_group_result: function(elements) {
		var _self = this;
		var result = _self.static_result_not_validated;
		elements.each(function(element) {
			if(element.ml_result > result) {
				result = element.ml_result;
			}
		});
		return result;
	},

	get_grouped_elements: function(element) {
		var _self = this;
		var elements = [];
		var status = _self.get_status_element(element);
		if(status.length > 0) {
			status[0].get('class').split(' ').each(function(status_class) {
				if(status_class.search(new RegExp('^' + _self.options.status_class_addition + '\\w+$', 'i')) > -1) {
					var element_name = status_class.replace(new RegExp('^' + _self.options.status_class_addition + '(\\w+)$', 'i'), '$1');
					var element = $$('[name=' + element_name + ']')[0];
					if(element && typeOf(element.ml_validate) != 'null') {
						elements.push(element);
					}
				}
			});
		}
		return elements;
	},

	get_rule_for_element: function(element) {
		var _self = this;
		var country_code = _self.options.countries[_self.global_selected_country];
		var rule = false;
		if(element.hasClass(_self.options.invalid_class) == true) {
			rule = _self.options.rules['default']['invalid'];
		} else {
			if(Object.keys(_self.options.rules).contains(country_code) == true) {
				rule = _self.options.rules[country_code][element.get('name')];
				if(typeOf(rule) == 'null') {
					rule = _self.options.rules['default'][element.get('name')];
					if(typeOf(rule) == 'null') {
						rule = false;
					}
				}
			}
		}
		return rule;
	},

	get_rules_for_element: function(element) {
		var _self = this;
		var country_code = _self.options.countries[_self.global_selected_country];
		var rules = false;
		if(element.hasClass(_self.options.invalid_class) == true) {
			rules = _self.options.rules['default']['invalid'];
		} else {
			if(Object.keys(_self.options.rules).contains(country_code) == true) {
				rules = _self.options.rules[country_code][element.get('name')];
				if(typeOf(rules) == 'null') {
					rules = _self.get_default_rules(element);
				}
			} else {
				rules = _self.get_default_rules(element);
			}
		}
		return rules;
	},

	get_default_rules: function(element) {
		var _self = this;
		var rules = _self.options.rules['default'][element.get('name')];
		if(typeOf(rules) == 'null') {
			rules = false;
		}
		_self.console_log('# get_default_rules - name: ' + element.get('name') + ' - rules: ' + rules);
		return rules;
	},

	get_status_element: function(element) {
		var _self = this;
		return $$('.' + _self.options.status_class_addition + element.get('name'));
	},

	get_event_target: function(event) {
		var _self = this;
		var target = false;
		if(!event) {
			event = window.event;
		}
		if(event.target) {
			target = event.target;
		} else {
			if(event.srcElement) {
				target = event.srcElement;
			}
		}
		if(target.nodeType == 3) {
			target = target.parentNode;
		}
		return target;
	},

	set_element_invalid: function(element, invalid) {
		var _self = this;
		if(invalid == true) {
			element.addClass(_self.options.invalid_class);
		} else {
			element.removeClass(_self.options.invalid_class);
		}
		_self.console_log('# set_element_invalid - name: ' + element.get('name') + ' - invalid: ' + invalid);
		_self.validate_element(element);
	},

	is_form_valid: function(event) {
		var _self = this;
		_self.console_log('##### is_form_valid: begin');
		var result = true;
		var fields = _self.scan_fields();
		_self.fireEvent('moolidator_lite_is_form_valid', event);
		Object.each(fields, function(elements) {
			if(typeOf(elements) == 'element') {
				if(_self.validate_element(elements) == _self.static_result_invalid) {
					result = false;
				}
			} else {
				Object.each(elements, function(element) {
					if(_self.validate_element(element) == _self.static_result_invalid) {
						result = false;
					}
				});
			}
		});

		/* remove emoticons by Submit */
        $$('input').each(function (emo_element) {
            if(_self.options.single_input_fields_emoticon_check.contains(emo_element.get('type')) === true) {
            	if (emo_element.value && emo_element.value.length > 0) {
            		emo_element.value = emo_element.value.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, '');
            	}
            }
        });

		if(result == true) {
			_self.fireEvent('moolidator_lite_form_is_valid', event);
		} else {
			_self.fireEvent('moolidator_lite_form_is_not_valid', event);
		}
		_self.console_log('##### is_form_valid: end - result: ' + result);
		return result;
	},

	is_radio_check_optional: function(element) {
		var _self = this;
		var result = false;
		if(element.hasClass(_self.options.optional_class) == true && $$('[name=' + element.get('name') + ']:checked').length == 0) {
			result = true;
		}
		return result;
	},

	is_text_optional: function(element) {
		var _self = this;
		var result = false;
		if(element.hasClass(_self.options.optional_class) == true && element.get('value').trim() == '') {
			result = true;
		}
		return result;
	},

	is_key_pressed: function(key, event) {
		var _self = this;
		var result = false;
		if(typeOf(event) == 'domevent') {
			if(event.code == key) {
				result = true;
			}
		}
		return result;
	},

	is_IE6: function() {
		var _self = this;
		if(navigator.userAgent.search(/MSIE 6\.0/) > -1) return true;
		else return false;
	},

	is_mobile: function() {
		var _self = this;

		if (Object.contains(_self.options.browser.mobile, true)) {
			_self.console_log('## you use a Mobile');
			return true
		} else {
			_self.console_log('## you use a Desktop');
			return false;
		}
	},

	show_nothing: function(element) {
		var _self = this;
		element.removeClass(_self.options.success_class);
		element.removeClass(_self.options.error_class);
	},

	show_success: function(element) {
		var _self = this;
		element.addClass(_self.options.success_class);
		element.removeClass(_self.options.error_class);
	},

	show_error: function(element) {
		var _self = this;
		element.removeClass(_self.options.success_class);
		element.addClass(_self.options.error_class);
	},

	show_edit: function(element) {
		var _self = this;
		element.addClass(_self.options.edit_class);
	},

	hide_all: function(element) {
		var _self = this;
		element.removeClass(_self.options.success_class);
		element.removeClass(_self.options.error_class);
		element.removeClass(_self.options.edit_class);
	},

	hide_success: function(element) {
		var _self = this;
		element.removeClass(_self.options.success_class);
	},

	hide_error: function(element) {
		var _self = this;
		element.removeClass(_self.options.error_class);
	},

	hide_edit: function(element) {
		var _self = this;
		element.removeClass(_self.options.edit_class);
	},

	pad_number: function(number, size) {
		var _self = this;
		var padded_number = '' + number;
		while(padded_number.length < (size || 2)) {
			padded_number = '0' + padded_number;
		}
		return padded_number;
	},

	version: function(as_object) {
		var _self = this;
		if(typeOf(as_object) == 'boolean') {
			if(as_object == true) {
				return _self.global_version;
			}
		} else {
			return _self.global_version.name + ' ' + _self.global_version.version;
		}
	},

	console_log: function(text) {
		var _self = this;

        // Galaxy S6 bugfix
        // $(document.body).addClass('__ml__').removeClass('__ml__');

		try {
			if(_self.options.debug == true) {
				console.log(text);
			}
		} catch(error) {
			// there is no console, all error messages are lost for eternity...
		}
	}
});
