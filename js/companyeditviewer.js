'use strict';
const BaseComponent = require('./basecomponent');
let compiledTemplate = require('../templates/company-edit-viewer-template.hbs');
class CompanyEditViewer extends BaseComponent {
  constructor(options) {
    super(options.element);
    this._el = options.element;
    this._el.addEventListener('click', this._onEditCompanyButtonsClick.bind(this));

  }
  render(companyObject) {
  	this._el.innerHTML = compiledTemplate({
  		company: companyObject
  	})
  } 
  _onEditCompanyButtonsClick(event) {
        event.preventDefault();
        
        if (event.target.closest('[data-element="editViewerCompanyOk"]')) {
          let companyID = document.querySelector('[data-element="idcompanyedit"]').value.trim();
          let companyINN = document.querySelector('[data-element="inncompanyedit"]').value.trim();
          let companyNAME = document.querySelector('[data-element="namecompanyedit"]').value.trim();
          let companyBOSS = document.querySelector('[data-element="bosscompanyedit"]').value.trim();

          
          this._triggerEditButtonsClick('editViewerCompanyOk', {
            id: companyID,
            inn: companyINN,
            name: companyNAME,
            boss: companyBOSS

          });


         
        }
        if (event.target.closest('[data-element="editViewerCompanyCancel"]')) {
          this._triggerEditButtonsClick('editViewerCompanyCancel');
          
        }

  }
  _triggerEditButtonsClick(newEvent, detail) {

          detail = detail || 0;
          let customEvent = new CustomEvent(newEvent, {
            detail: detail
          });
          this._el.dispatchEvent(customEvent);  
  }
}

module.exports = CompanyEditViewer;