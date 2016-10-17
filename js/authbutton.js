'use strict';
let BaseFunc = require('./basefunc');
class AuthButton extends BaseFunc {
  constructor(options) {
  	super();
    this._el = options.element;
    this._el.addEventListener('click', this._onButtonClick.bind(this));

  }
   _onButtonClick(event) {
    	if (!event.target.closest('[data-component="authbutton"]')) {
    		return;
    	}

    	event.preventDefault();

    	this._triggerAuthButtonPress();
    }
   _triggerAuthButtonPress() {
   		
    	let customEvent = new CustomEvent("authButtonPress", {
    		detail: ""
    	});
    	this._el.dispatchEvent(customEvent);
  	}

  	getElement() {
  		return this._el;
  	}
  	render() {
  		let cookieInn = this.getCookie('authinn');
  		if (this.isLogin()) {
  			this.getElement().innerHTML = "Выход из учетной записи";
  		} else {
  			this.getElement().innerHTML = "Авторизоваться";
  		}
  	}


}
module.exports = AuthButton;