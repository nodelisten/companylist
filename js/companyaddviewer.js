'use strict';
const BaseComponent = require('./basecomponent');
let compiledTemplate = require('../templates/company-add-viewer-template.hbs');
class CompanyAddViewer extends BaseComponent {
  constructor(options) {
    super(options.element);
    this._el = options.element;
    this._el.addEventListener('click', this._onEditCompanyButtonsClick.bind(this));

  }
  render(companyINN) {
  	this._el.innerHTML = compiledTemplate({
      companyINN: companyINN
    });
  } 
  _onEditCompanyButtonsClick(event) {
        event.preventDefault();
        
        if (event.target.closest('[data-element="addViewerCompanyOk"]')) {

          let companyINN = document.querySelector('[data-element="inncompanyadd"]').value.trim();
          let companyNAME = document.querySelector('[data-element="namecompanyadd"]').value.trim();
          let companyBOSS = document.querySelector('[data-element="bosscompanyadd"]').value.trim();

          
          this._triggerAddButtonsClick('addViewerCompanyOk', {
            inn: companyINN,
            name: companyNAME,
            boss: companyBOSS

          });


         
        }
        if (event.target.closest('[data-element="addViewerCompanyCancel"]')) {
          this._triggerAddButtonsClick('addViewerCompanyCancel');
          
        }

  }
  _triggerAddButtonsClick(newEvent, detail) {

          detail = detail || 0;
          let customEvent = new CustomEvent(newEvent, {
            detail: detail
          });
          this._el.dispatchEvent(customEvent);  
  }
}

module.exports = CompanyAddViewer;