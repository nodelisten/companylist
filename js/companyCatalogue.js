'use strict';
const BaseComponent = require('./basecomponent');
class CompanyCatalogue extends BaseComponent {
  constructor(options) {
    super(options.element);
    this._compiledTemplate = require('../templates/company-catalogue-template.hbs');
    this._el = options.element;
    this._companiesJSON = options.companies;
    this.render();
    this._el.addEventListener('click', this._onEditLinkClick.bind(this));


  }
 _onEditLinkClick(event) {
    	if (event.target.closest('[data-element="editCompanyLink"]')) {
        
        let idElement = event.target.closest('[data-element="editCompanyLink"]').getAttribute('data-company-id');
        
        this._triggerEditCompany(idElement, 'editCompany');
        
    	}
      if (event.target.closest('[data-element="deleteCompanyLink"]')) {
        
        let idElement = event.target.closest('[data-element="deleteCompanyLink"]').getAttribute('data-company-id');

        this._triggerEditCompany(idElement, 'deleteCompany');
        
      }
    }

  render() {

  	this._el.innerHTML = this._compiledTemplate({
  		companies: this._companiesJSON,
      innNumber: this.getCookie('authinn')
  	});
    
  }
    show() {
    this.render();
    this._el.classList.remove('js-hidden');
  };    
  _triggerEditCompany(idElement, action){

      	let customEvent = new CustomEvent(action, {
      		detail: idElement
      	});
      	this._el.dispatchEvent(customEvent);

  }
}

module.exports = CompanyCatalogue;