'use strict';
const BaseComponent = require('./basecomponent');
class AddCompanyButton extends BaseComponent {
  constructor(options) {
  	super(options.element);
    this._el = options.element;
    this._el.addEventListener('click', this._onButtonClick.bind(this));

  }
   _onButtonClick(event) {
    event.preventDefault();
    	if (!event.target.closest('[data-component="addcompanybutton"]')) {
    		return;
    	}

    	

    	this._triggerAddCompanyButton();
    }
   _triggerAddCompanyButton() {
   		
    	let customEvent = new CustomEvent("addCompanyButton", {
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
  			this.show();
  		} else {
  			this.hide();
  		}
  	}


}
module.exports = AddCompanyButton;