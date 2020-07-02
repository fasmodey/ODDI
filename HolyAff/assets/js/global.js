/* filling city from zipcode */
control_form = new Object();
control_form.block_city = true;
control_form.last_zipcode = '';
control_form.initialize = function() {
	if(control_form.block_city == true) {
		if($('city').get('value') == '') {
			control_form.readonlyElement($('city'), true);
		}
	}
	$('zipcode').addEvents({
		keyup: function() {
			if(control_form.check_conditions() == true) {
				control_form.request_city();
			}
		},
		blur: function() {
			if(control_form.check_conditions() == true) {
				control_form.request_city();
			} else {
				if(control_form.block_city == true) {
					setTimeout(function() {
						control_form.readonlyElement($('city'), false);
					},100);
				}
			}
		},
		focus: function() {
			if(control_form.block_city == true) {
				control_form.readonlyElement($('city'), true);
			}
		}
	});
}
control_form.readonlyElement = function(element, option) {
	if($$('[name=country]')[0].get('value') == '1') {
		if(option == true) {
			element.addClass('readonly');
			element.setProperty('readonly', 'readonly');
		} else {
			element.removeClass('readonly');
			element.removeProperty('readonly');
		}
	}
}
control_form.check_conditions = function() {
	var result = false;
	if($('zipcode').get('value').search(/^\d{5}$/i) > -1 && $$('[name=country]')[0].get('value') == '1'){
		result = true;
	}
	return result;
}
control_form.request_city = function() {
	if(control_form.last_zipcode != $('zipcode').get('value')){
		control_form.request = new Request.JSON({
			url: "/cgi-bin/wingame.pl?todo=get_city_from_zipcode&zipcode=" + $('zipcode').get('value'),
			method: 'GET',
			onComplete: function(response) {
				control_form.process_results(response);
				if(control_form.block_city == true) {
					control_form.readonlyElement($('city'), false);
				}
				try {
					if(mooli != false){
						mooli.validate($('city'));
						if($('province').rules.length > 0) {
							mooli.validate($('province'));
						}
					}
				} catch(error) {
				}
			},
			onFailure: function() {
				if(control_form.block_city == true) {
					control_form.readonlyElement($('city'), false);
				}
			}
		}).send();
		control_form.last_zipcode = $('zipcode').get('value');
	}

}
control_form.process_results = function(response) {
	if(control_form.check_conditions() == true && response.status == 'success') {
		var inject_target;
		if($('label_city')) {
			inject_target = $('label_city');
		} else {
			inject_target = $('zipcode');
		}
		if(response.cities.length > 1) {
			$('city').destroy();
			var city_select = new Element('select',{
				'id':'city',
				'name' : 'city',
				'class': 'validate autofill select'
			}).inject(inject_target,'before');
			var opt = new Element('option', {
				value: '',
				text: 'scegli'
			}).inject('city');

			response.cities.each(function(city) {
				var opt = new Element('option', {
					value: city,
					text: decodeURI(city)
				}).inject('city');
			});
			if(typeOf(mooli.version) == 'function'){
				mooli.add_validation($('city'), false);
			}
		} else {
			$('city').destroy();
			var city_select = new Element('input',{
				'type':'text',
				'id':'city',
				'name' : 'city',
				'class': 'validate autofill text'
			}).inject(inject_target,'before');

			$('city').focus();
			$('city').set('value', response.cities);
			if(typeOf(mooli.version) == 'function'){
				mooli.add_validation($('city'), false);
			}
			$('city').blur();
		}
	}
	if(control_form.check_conditions() == true && response.status == 'failed'){
		var inject_target;
		if($('label_city')) {
			inject_target = $('label_city');
		} else {
			inject_target = $('zipcode');
		}
		if($('city').type != 'text'){
			$('city').destroy();
			var city_select = new Element('input',{
				'type':'text',
				'id':'city',
				'name' : 'city',
				'class': 'validate autofill text'
			}).inject(inject_target,'after');
			if(typeOf(mooli.version) == 'function'){
				mooli.add_validation($('city'), false);
			}
		}
	}

	if(control_form.block_city == true) {
		$('city').removeProperty('disabled');
		$('city').removeClass('disabled');
	}
}
control_form.enabled_fields = function() {
	$$('#form_reg_half *:disabled').removeProperty('disabled');
}
