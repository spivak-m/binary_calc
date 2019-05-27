'use strict'

var calcForm		= document.querySelector('.js-calc'),
	inputs		= calcForm.querySelectorAll('.js-calcInput'),
	operators	= calcForm.querySelectorAll('.js-calcBtn'),
	result		= calcForm.querySelector('.js-calcResult');

for(var i = 0; i < operators.length; i++) {
	operators[i].addEventListener('click', function(e) {
		var attr 	= this.getAttribute('data-operator'),
			num1	= parseInt(inputs[0].value, 2),
			num2	= parseInt(inputs[1].value, 2);

		if(attr == 'plus') {
			if(!checkEmpetyFields()) return false;
			var siblings = getSiblings(this);
			this.classList.add('__current');
			siblings.forEach(function(item) {
				item.classList.remove('__current');
			});
			result.value = calc.sum(num1, num2).toString(2);
		} 
		else if(attr == 'minus') {
			if(!checkEmpetyFields()) return false;
			var siblings = getSiblings(this);
			this.classList.add('__current');
			siblings.forEach(function(item) {
				item.classList.remove('__current');
			});
			result.value = calc.subtr(num1, num2).toString(2);
		}
		else if(attr == 'and') {
			if(!checkEmpetyFields()) return false;
			var siblings = getSiblings(this);
			this.classList.add('__current');
			siblings.forEach(function(item) {
				item.classList.remove('__current');
			});
			result.value = calc.and(num1, num2).toString(2);
		}
		else if(attr == 'or') {
			if(!checkEmpetyFields()) return false;
			var siblings = getSiblings(this);
			this.classList.add('__current');
			siblings.forEach(function(item) {
				item.classList.remove('__current');
			});
			result.value = calc.or(num1, num2).toString(2);
		}
		else if(attr == 'c') {
			var siblings = getSiblings(this);
			siblings.forEach(function(item) {
				item.classList.remove('__current');
			});
			for(var i = 0; i < inputs.length; i++) {
				inputs[i].value = '';
				if(inputs[i].classList.contains('__no-valid')) inputs[i].classList.remove('__no-valid');
			}
			result.value = '';
		};
	});
}

window.onkeydown = function(e) {
	if(e.keyCode == 107) {
		var operator = calcForm.querySelector('.js-calcBtn[data-operator="plus"]');
		operator.click();
	} else if(e.keyCode == 109) {
		var operator = calcForm.querySelector('.js-calcBtn[data-operator="minus"]');
		operator.click();
	} else if(e.keyCode == 65) {
		var operator = calcForm.querySelector('.js-calcBtn[data-operator="and"]');
		operator.click();
	} else if(e.keyCode == 79) {
		var operator = calcForm.querySelector('.js-calcBtn[data-operator="or"]');
		operator.click();
	} else if(e.keyCode == 67) {
		var operator = calcForm.querySelector('.js-calcBtn[data-operator="c"]');
		operator.click();
	} else if(e.keyCode == 81) {
		e.preventDefault();
		inputs[0].focus();
	} else if(e.keyCode == 87) {
		e.preventDefault();
		inputs[1].focus();
	};
};

// VALIDATE INPUT FIELDS

for(var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('keydown', function(e) {
		if( e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
			(e.keyCode == 65 && e.ctrlKey === true) ||
			(e.keyCode >= 35 && e.keyCode <= 39) ) {
			return
		} else if (e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 65 || e.keyCode == 67 || e.keyCode == 79) {
			e.preventDefault();
			this.parentElement.querySelector('.calc_input-notify').classList.remove('__is-show');
		} else {
			if (e.keyCode != 48 && e.keyCode != 49 && e.keyCode != 96 && e.keyCode != 97) {
				this.parentElement.querySelector('.calc_input-notify').classList.add('__is-show');
				e.preventDefault();
			} else {
				if(this.classList.contains('__no-valid')) this.classList.remove('__no-valid');
				this.parentElement.querySelector('.calc_input-notify').classList.remove('__is-show');
			};
		};
	});

	inputs[i].addEventListener('blur', function() {
		this.parentElement.querySelector('.calc_input-notify').classList.remove('__is-show');
	});
}

function checkEmpetyFields() {
	var counter = 0;

	for(var i = 0; i < inputs.length; i++) {
		if(!inputs[i].value) {
			inputs[i].classList.add('__no-valid');
		} else {
			inputs[i].classList.remove('__no-valid');
			counter++;
		};
	};

	if(counter == inputs.length) {
		return true
	} else {
		return false;
	};
};

// OPERATIONS

var calc = {

	sum: function(a,b) {
		return a + b;
	},

	subtr: function(a,b) {
		return a - b;
	},

	and: function(a,b) {
		return a & b;
	},

	or: function(a,b) {
		return a | b;
	}

};

// HELPERS

function getSiblings(elem) {
	var siblings = [],
		sibling = elem;

	while(sibling.previousSibling) {
		sibling = sibling.previousSibling;
		sibling.nodeType == 1 && siblings.push(sibling);
	}

	sibling = elem;
	while (sibling.nextSibling) {
		sibling = sibling.nextSibling;
		sibling.nodeType == 1 && siblings.push(sibling);
	}

	return siblings;
};
