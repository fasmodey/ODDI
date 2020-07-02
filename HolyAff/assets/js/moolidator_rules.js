var moolidator_lite_rules = {
	'default': {
		'invalid': {
			'trimming': [],
			'positive': [/^\t{100}$/],
			'negative': []
		},
		'gender': {
			'trimming': [],
			'positive': [/^(male|female)$/],
			'negative': []
		},
		'wingame_special_marital_status': {
			'trimming': [],
			'positive': [/^(single|married)$/],
			'negative': []
		},
		'title': {
			'trimming': [],
			'positive': [/^(Mr|Ms|Miss|Mrs)$/],
			'negative': []
		},
		'firstname': {
			'trimming': [],
			'positive': [/^.{1,50}$/],
			'negative': [/[\@]/, /^\D*(\d\D*){1,2}$/]
		},
		'firstname2': {
			'trimming': [],
			'positive': [/^.{1,50}$/],
			'negative': [/[\@]/, /^\D*(\d\D*){1,2}$/]
		},
		'lastname': {
			'trimming': [],
			'positive': [/^.{1,50}$/],
			'negative': [/[\@]/, /^\D*(\d\D*){1,2}$/]
		},
		'lastname2': {
			'trimming': [],
			'positive': [/^.{1,50}$/],
			'negative': [/\d/]
		},
		'email': {
			'trimming': [],
			'positive': [/^[\w.=+-]+@(?:[\da-zA-Z](?:[\w+-]*[\da-zA-Z])*\.)+[a-zA-Z]{2,}$/],
			'negative': []
		},
		'agb': {
			'trimming': [],
			'positive': [/^1$/],
			'negative': []
		},
		'agb2': {
            'trimming': [],
            'positive': [/^1$/],
            'negative': []
        },
        'agb3': {
            'trimming': [],
            'positive': [/^1$/],
            'negative': []
        },
		'street_type': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/\w{2,}/],
			'negative': [/^[\d\s]+$/]
		},
		'street1': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'street2': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'street3': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'streetnr': {
			'trimming': [],
			'positive': [/\d/],
			'negative': []
		},
		'door': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'apartment': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'zipcode1': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'zipcode2': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/\w{2,}/],
			'negative': [/^\d+$/]
		},
		'region': {
			'trimming': [],
			'positive': [/^.+$/],
			'negative': []
		},
		'state': {
			'trimming': [],
			'positive': [/^\d+$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/^\d+$/],
			'negative': []
		},
		'neighborhood': {
			'trimming': [],
			'positive': [/[A-Za-za-z]{1,}/],
			'negative': []
		},
		'telco_company': {
			'trimming': [],
			'positive': [/^[A-Z]{3}$/],
			'negative': []
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^\d{2,}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^\d{5,}$/],
			'negative': []
		},
		'country': {
			'trimming': [],
			'positive': [/^\d+$/],
			'negative': []
		},
		'countryofbirth': {
			'trimming': [],
			'positive': [/^\d+$/],
			'negative': []
		},
		'dayofbirth': {
			'trimming': [],
			'positive': [/^0?[1-9]$|^[1-2][0-9]$|^3[0-1]$/],
			'negative': [/[4-9]\d|3[2-9]/]
		},
		'monthofbirth': {
			'trimming': [],
			'positive': [/^0?[1-9]$|^1[0-2]$/],
			'negative': [/[2-9]\d|1[3-9]/]
		},
		'yearofbirth': {
			'trimming': [],
			'positive': [/19\d\d|20\d\d/],
			'negative': []
		}
	},
	'ar': {
		'province': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^[0-9\+]+$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^[0-9]+$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		}
	},
	'at': {
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0[\d\s\/]+[0-9]+$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		}
	},
	'au': {
		'streetnr': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0(2|3|4|7|8)\d{8}$/],
			'negative': []
		}
	},
	'be': {
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0(4\d{8}|[12356789]\d{7})$/],
			'negative': [/\D/]
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		},
		'streetnr': {
			'trimming': [],
			'positive': [/\d/],
			'negative': [/^0$/]
		}
	},
	'br': {
		'zipcode1': {
			'trimming': [/\D/g],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'zipcode2': {
			'trimming': [/\D/g],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^\d+$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^\d+$/],
			'negative': []
		},
		'passport1': {
			'trimming': [],
			'positive': [/\d/],
			'negative': []
		},
		'passport2': {
			'trimming': [],
			'positive': [/\d/],
			'negative': []
		},
		'passport3': {
			'trimming': [],
			'positive': [/\d/],
			'negative': []
		},
		'passport4': {
			'trimming': [],
			'positive': [/\d/],
			'negative': []
		}
	},
	'ca': {
		'zipcode': {
			'trimming': [/\W/g],
			'positive': [/^[ABCEGHJKLMNPRSTVXY]\d[A-Z] *\d[A-Z]\d$/],
			'negative': []
		}
	},
	'ch': {
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^[0-9\+]+$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^[0-9]+$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		}
	},
	'cl': {
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{7}$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/^.+$/],
			'negative': []
		},		
		'tel_number': {
			'trimming': [],
			'positive': [/^\d{9}$/],
			'negative': []
		}
	},
	'cn': {
		'street': {
			'trimming': [],
			'positive': [/[\u4E00-\u9FFF\u3400-\u4DFF\u20000-\u2A6DF\u2A700-\u2B73F\u2B840-\u2B81F\uF900-\uFAFF ]{10,}/],
			'negative': [/[a-zA-Z]/]
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^(1(3|4|5|8)\d{9}|0\d{10,11})$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^[ \S]+$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{6}$/],
			'negative': []
		}
	},
	'co': {
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/^.+$/],
			'negative': []
		},		
		'tel_number': {
			'trimming': [],
			'positive': [/^(\d\d){4,5}$/],
			'negative': []
		}
	},	
	'cz': {
		'street': {
			'trimming': [],
			'positive': [/^[0-9A-Za-zĚŠČŘŽÝÁÍÉŮÚĎŤÓŇÄÖÜßěščřžýáíéůúďťóňöäü ._-]+$/],
			'negative': [/^[\d\s]+$/]
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^\d{9,10}$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{5}$/],
			'negative': []
		}
	},
	'de': {
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0\d{1,14}$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'wingame_special_agb_cookie': {
			'trimming': [],
			'positive': [/^1$/],
			'negative': []
		},
        'wingame_special_language_pref': {
            'trimming': [],
            'positive': [/^(deutsch|englisch|sonstige)$/i],
            'negative': []
        },
		'wingame_special_car_brand': {
			'trimming': [],
			'positive': [/^.+$/i],
			'negative': []
		},
		'wingame_special_fuel': {
			'trimming': [],
			'positive': [/^.+$/i],
			'negative': []
		},
		'wingame_special_available': {
			'trimming': [],
			'positive': [/^.+$/i],
			'negative': []
		},
        'wingame_special_car_brand_modell': {
            'trimming': [],
            'positive': [/^.+$/i],
            'negative': []
        }
	},
	'dk': {
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^[1-9][0-9]{7}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^[A-Za-z\d\-\x81-\x9F\xE0-\xFC\x40-\x7E\x80-\xFC ]{2,}$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		}
	},
	'es': {
		'firstname': {
			'trimming': [],
			'positive': [/\w{2}/, /^.{2,50}$/],
			'negative': [/[\@]/, /(^\D*(\d\D*){1,2}$)|(,)/]
		},
		'lastname': {
			'trimming': [],
			'positive': [/\w{2}/, /^.{1,50}$/],
			'negative': [/[\@]/, /(^\D*(\d\D*){1,2}$)|(,)/]
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^[679]\d{8}$/],
			'negative': [/\D/]
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^[0-4]\d{4}$|^5[0-3]\d{3}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/\w/],
			'negative': [/\d/]
		},
		'wingame_special_agb2': {
			'trimming': [],
			'positive': [/^1$/],
			'negative': []
		},
		'wingame_special_agb3': {
			'trimming': [],
			'positive': [/^1$/],
			'negative': []
		}		
	},
	'fi': {
		'street': {
			'trimming': [],
			'positive': [/[A-Za-z]{2,}.*/],
			'negative': []
		},
		'streetnr': {
			'trimming': [],
			'positive': [/^\d/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\D/g],
			'positive': [/^\d{7,10}$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/[a-zA-Z\x81-\x9F\xE0-\xFC\x40-\x7E\x80-\xFC ]{2,}[\d]*/],
			'negative': []
		}
	},
	'fr': {
		'street': {
			'trimming': [],
			'positive': [/\w{2,}/],
			'negative': [/^[\d\s]+$/, /\d{5,}/]
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0\d{5}/],
			'negative': [/\D/]
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'agb_18': {
			'trimming': [],
			'positive': [/^1$/],
			'negative': []
		},
        'wingame_special_agb': {
            'trimming': [],
            'positive': [/^1$/],
            'negative': []
        },
        'wingame_special_agb2': {
            'trimming': [],
            'positive': [/^1$/],
            'negative': []
        }
	},
	'hk': {
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^[2356789]\d{7}$/],
			'negative': []
		},
		'floor_block_apartment': {
			'trimming': [],
			'positive': [/^[^\s]+/],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/^[\S /A-Za-z]*$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^[\S /A-Za-z]*$/],
			'negative': []
		},
		'district': {
			'trimming': [],
			'positive': [/^[\S /A-Za-z]*$/],
			'negative': []
		},
		'wingame_special_language_pref': {
			'trimming': [],
			'positive': [/^(chinese|english)$/i],
			'negative': []
		}
	},
	'hu': {
		'street': {
			'trimming': [],
			'positive': [/^[0-9A-Za-zEŠCRŽÝÁÍÉUÚDTÓNÄÖÜOUßešcržýáíéuúdtónöäüou ._-]+$/],
			'negative': [/^[\d\s]+$/]
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^06\d{1,2}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\D/g],
			'positive': [/^06\d{6,11}$/],
			'negative': []
		}
	},
	'id': {
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^08\d{8,10}$/],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/\w{2,}/, /[ ]/g],
			'negative': []
		},
		'district': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'sub_district': {
			'trimming': [],
			'positive': [/^[0-9]{2,3}$/],
			'negative': []
		},
		'block': {
			'trimming': [],
			'positive': [/^[A-Z0-9]{1,8}$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		}
	},
	'in': {
		'state': {
			'trimming': [],
			'positive': [/^\w/],
			'negative': []
		},
		'tel_number': {
			'trimming': [],
			'positive': [/^(7|8|9)\d{9}$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{6}$/],
			'negative': []
		}
	},
	'it': {
		'nationality': {
			'trimming': [],
			'positive': [/^\d+$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/\w{2,}/],
			'negative': [/\d/]
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^\d{6,13}$/],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/\w{2,}/],
			'negative': [/\d/]
		},
		'streetnr': {
			'trimming': [/\D/g],
			'positive': [/^\d{1,4}$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{5}$/],
			'negative': []
		}
	},
	'jp': {
		'firstname': {
			'trimming': [],
			'positive': [/^\S{1,50}$/],
			'negative': [/[\da-zA-Z]/]
		},
		'firstname2': {
			'trimming': [],
			'positive': [],
			'negative': [/[\da-zA-Z]/]
		},
		'lastname': {
			'trimming': [],
			'positive': [/^\S{1,50}$/],
			'negative': [/[\da-zA-Z]/]
		},
		'lastname2': {
			'trimming': [],
			'positive': [],
			'negative': [/[\da-zA-Z]/]
		},
		'street': {
			'trimming': [],
			'positive': [/^\S+$/],
			'negative': [/[A-Za-z]/]
		},
		'zipcode1': {
			'trimming': [],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'zipcode2': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^[ \S]+$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/^\S+$/],
			'negative': []
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^0\d{1,5}$/],
			'negative': []
		},
		'tel_number1': {
			'trimming': [/\s/g],
			'positive': [/^\d{1,4}$/],
			'negative': []
		},
		'tel_number2': {
			'trimming': [/\s/g],
			'positive': [/^\d{4}$/],
			'negative': []
		}
	},
	'kr': {
		'email1': {
			'trimming': [],
			'positive': [/^([0-9a-z_]+[_\.\-+]*)*[0-9a-z_\-+]+$/i],
			'negative': []
		},
		'email2': {
			'trimming': [],
			'positive': [/^([0-9a-z_\-+]+\.)+[0-9a-z_\.\-+]{2,4}$/i],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/.{0,3}/],
			'negative': []
		},
		'street2': {
			'trimming': [],
			'positive': [/\d/],
			'negative': []
		},
		'zipcode1': {
			'trimming': [],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'zipcode2': {
			'trimming': [],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/.{2,}/],
			'negative': []
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'tel_number': {
				'trimming': [/\s/g],
				'positive': [/^01(0|1|6|7|8|9)\d{7,8}$/],
				'negative': []
		},
		'tel_number1': {
			'trimming': [/\s/g],
			'positive': [/^\d{3,4}$/],
			'negative': []
		},
		'tel_number2': {
			'trimming': [/\s/g],
			'positive': [/^\d{3,4}$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/.{2,}/],
			'negative': []
		},
		'dateofbirth_6_digits': {
			'trimming': [],
			'positive': [/^\d{2}(0|1)\d{1}(0|1|2|3)\d{1}$/],
			'negative': []
		}
	},
	'my': {
		'street1': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'street3': {
			'trimming': [],
			'positive': [/\d/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'zipcode': {
			'trimming': [/[\/\+\s_-]/g],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'tel_areacode': {
			'trimming': [/[\/\+\s_-]/g],
			'positive': [/^01[0-46-9]$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/[\/\+\s_-]/g],
			'positive': [/^[1-9]\d{6,7}$/],
			'negative': []
		}
	},
	'mx': {
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'suburb': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'tel_number': {
			'trimming': [],
			'positive': [/^\d{10}$/],
			'negative': []
		}
	},
	'nl': {
		'zipcode': {
			'trimming': [/[\/\+\s_-]/g],
			'positive': [/^[1-9][0-9]{3}[a-zA-Z]{2}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0[123456789]\d{8}$/],
			'negative': [/\D/, /^0+90[069]/]
		}
	},
	'no': {
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^[A-Za-z\d\-\x81-\x9F\xE0-\xFC\x40-\x7E\x80-\xFC ]{2,}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^[1-9]\d+$/],
			'negative': []
		}
	},
	'nz': {
		'province': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0((3|4|6|7|9|20|21|22|23|24|27|28|29)\d{6,8})$/],
			'negative': []
		}
	},
	'pe': {
		'zipcode': {
			'trimming': [],
			'positive': [/^[0-2]\d{4}$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/^.+$/],
			'negative': []
		},		
		'tel_number': {
			'trimming': [],
			'positive': [/^9\d{8}$/],
			'negative': []
		}
	},	
	'ph': {
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{4}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0(8|9)\d{9}$/],
			'negative': []
		},
		'district': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		}
	},
	'pl': {
		'firstname': {
			'trimming': [],
			'positive': [/^.{1,50}$/],
			'negative': [/\//, /,/, /[\@]/, /^\D*(\d\D*){1,2}$/, /\d/]
		},
		'lastname': {
			'trimming': [],
			'positive': [/^.{1,50}$/],
			'negative': [/\//, /,/, /[\@]/, /^\D*(\d\D*){1,2}$/, /\d/]
		},
		'streetnr': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'apartment': {
			'trimming': [/"/g],
			'positive': [/\w/],
			'negative': [/^Nr mieszk\.$/]
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{2}$/],
			'negative': []
		},
		'zipcode2': {
			'trimming': [/\D/g],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/\w/],
			'negative': [/\d/]
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^\d{9,10}$/],
			'negative': []
		},
		'wingame_special_agb2': {
			'trimming': [],
			'positive': [/^1$/],
			'negative': []
		},
		'wingame_special_agb3': {
			'trimming': [],
			'positive': [/^1$/],
			'negative': []
		},
        'wingame_special_agb4': {
            'trimming': [],
            'positive': [/^1$/],
            'negative': []
        },
        'wingame_special_agb5': {
            'trimming': [],
            'positive': [/^1$/],
            'negative': []
        },
		'wingame_special_mobile_type': {
			'trimming': [],
			'positive': [/^(karta)|(abonament)$/],
			'negative': []
		}
	},
	'pt': {
		'zipcode1': {
			'trimming': [/\D/g],
			'positive': [/^\d{4}$/],
			'negative': []
		},
		'zipcode2': {
			'trimming': [/\D/g],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^\d{9}$/],
			'negative': []
		}
	},
	'ru': {
		'firstname': {
			'trimming': [],
			'positive': [/^[\u0400-\u052f]([\u0400-\u052f]|[\s\-\.\,]){1,49}$/],
			'negative': []
		},
		'lastname': {
			'trimming': [],
			'positive': [/^[\u0400-\u052f]([\u0400-\u052f]|[\s\-\.\,]){1,49}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^[\u0400-\u052f]([\u0400-\u052f]|[\s\-\.\,\d])*$/],
			'negative': []
		},
		'state': {
			'trimming': [],
			'positive': [/^[\u0400-\u052f]([\u0400-\u052f]|[\s\-\.\,\d])*$/],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/^[\u0400-\u052f]([\u0400-\u052f]|[\s\-\.\,])*$/],
			'negative': []
		},
		'streetnr': {
			'trimming': [],
			'positive': [/^([\u0400-\u052f]|[\s\-\.\,\d])*$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^(3|4|8|9)\d{9,10}$/],
			'negative': []
		}
	},
	'se': {
        'firstname': {
            'trimming': [],
            'positive': [/^.{1,50}$/],
            'negative': [/\d/]
        },
        'lastname': {
            'trimming': [],
            'positive': [/^.{1,50}$/],
            'negative': [/\d/]
        },
		'street': {
			'trimming': [],
			'positive': [/[\w\-\x81-\x9F\xE0-\xFC\x40-\x7E\x80-\xFC]{2,}/],
			'negative': [/^[\d\s]+$/]
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^[A-Za-z\d\-\x81-\x9F\xE0-\xFC\x40-\x7E\x80-\xFC ]{2,}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^(07\d{8}|0\d{6,9})$/],
			'negative': []
		}
	},
	'sg': {
		'street_floor': {
			'trimming': [],
			'positive': [/^([1-9])$|^(0[1-9])$|^([1-9][0-9])$/i],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/^\d{1,10}[a-z]?$/i],
			'negative': []
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{6}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^[689]\d{7}$/],
			'negative': []
		},
		'wingame_special_preferred_outlet': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		}
	},
	'sk': {
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^\d{9,10}$/],
			'negative': []
		}
	},
	'sp': {
		'street_floor': {
			'trimming': [],
			'positive': [/^([1-9])$|^(0[1-9])$|^([1-9][0-9])$/i],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/^\d{1,10}[a-z]?$/i],
			'negative': []
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{6}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^[689]\d{7}$/],
			'negative': []
		},
		'wingame_special_preferred_outlet': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		}
	},	
	'th': {
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^.*$/],
			'negative': []
		},
		'neighborhood': {
			'trimming': [],
			'positive': [/^.*$/],
			'negative': []
		},
		'region': {
			'trimming': [],
			'positive': [/^.+$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/^.+$/],
			'negative': []
		},
		'district': {
			'trimming': [],
			'positive': [/^.*$/],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/^.*$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [],
			'positive': [/^.*$/],
			'negative': []
		},
		'wingame_special_latin_firstname': {
			'trimming': [],
			'positive': [/^.*$/],
			'negative': []
		},
		'wingame_special_latin_lastname': {
			'trimming': [],
			'positive': [/^.*$/],
			'negative': []
		}
	},
	'tr': {
		'street': {
			'trimming': [],
			'positive': [/.{6,}/],
			'negative': []
		},
		'streetnr': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'neighborhood': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'district': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/.*/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/.{2}/],
			'negative': [/^\d+$/]
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^05\d{2}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^\d{7}$/],
			'negative': []
		}
	},
	'tw': {
		'firstname': {
			'trimming': [],
			'positive': [/^\S{1,25}[ ]{0,1}\S{1,25}$/],
			'negative': [/真實姓名/]
		},
		'lastname': {
			'trimming': [],
			'positive': [/^\S{1,25}[ ]{0,1}\S{1,25}$/],
			'negative': [/真實姓名/]
		},
		'street': {
			'trimming': [],
			'positive': [/[\S /A-Za-z]*$/],
			'negative': []
		},
		'district': {
			'trimming': [],
			'positive': [/^[\S /A-Za-z]*$/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^(\d{3}|\d{5})$/],
			'negative': []
		},
		'city': {
			'trimming': [],
			'positive': [/^[\S /A-Za-z]*$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^09\d{8}$/],
			'negative': []
		},
		'wingame_special_chinese_name': {
			'trimming': [],
			'positive': [/^\S*[ ]{0,1}\S*$/],
			'negative': [/真實姓名/]
		}
	},
	'uk': {
		'streetnr': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'zipcode': {
			'trimming': [/[\/\+\s_-]/],
			'positive': [/^(GIR0AA)|(((A[BL]|B[ABDHLNRSTX]?|C[ABFHMORTVW]|D[ADEGHLNTY]|E[HNX]?|F[KY]|G[LUY]?|H[ADGPRSUX]|I[GMP V]|JE|K[ATWY]|L[ADELNSU]?|M[EKL]?|N[EGNPRW]?|O[LX]|P[AEHLOR]|R[GHM]|S[AEGKLMNOPRSTY]?|T[ADFNQRSW]|UB |W[ADFNRSV]|YO|ZE)[1-9]?[0-9]|((E|N|NW|SE|SW|W)1|EC[1-4]|WC[12])[A-HJKMNPR-Y]|(SW|W)([2-9]|[1-9][0-9 ])|EC[1-9][0-9])[0-9][ABD-HJLNP-UW-Z]{2})$/i],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0[1-9]\d{9}$/],
			'negative': []
		},
		'wingame_special_homeowner': {
			'trimming': [],
			'positive': [/^(yes|no)$/],
			'negative': []
		}
	},
	'us': {
		'firstname': {
			'trimming': [],
			'positive': [/^.{1,50}$/],
			'negative': [/[\@]/, /^(Mr|Mrs|Ms)+\D*(\d\D*)*$/]
		},
		'lastname': {
			'trimming': [],
			'positive': [/^.{1,50}$/],
			'negative': [/[\@]/, /^(Mr|Mrs|Ms)+\D*(\d\D*)*$/, /^\D*(\d\D*){1,2}$/]
		},
		'zipcode': {
			'trimming': [/\D/g],
			'positive': [/^\d{5}$/],
			'negative': []
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'tel_number1': {
			'trimming': [/\s/g],
			'positive': [/^\d{3}$/],
			'negative': []
		},
		'tel_number2': {
			'trimming': [/\s/g],
			'positive': [/^\d{4}$/],
			'negative': []
		},
		'street': {
			'trimming': [],
			'positive': [/\w{2,}/],
			'negative': [/^[\d\s]+$/, /[;:#,\.]{2}/]
		}
	},
	'za': {
		'streetnr': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'zipcode': {
			'trimming': [],
			'positive': [/^\d{4}$/],
			'negative': []
		},
		'province': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'suburb': {
			'trimming': [],
			'positive': [/\w/],
			'negative': []
		},
		'tel_areacode': {
			'trimming': [/\s/g],
			'positive': [/^\d{3,4}$/],
			'negative': []
		},
		'tel_number': {
			'trimming': [/\s/g],
			'positive': [/^0[1-8]\d{8}$/],
			'negative': []
		}
	}
};
