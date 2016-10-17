'use strict';
let localDefaultCompanies = require('json!../templates/companies.json');
let BaseFunc = require('./basefunc');
let CompanyCatalogue = require('./companyCatalogue');
let CompanyEditViewer = require('./companyeditviewer');
let CompanyAddViewer = require('./companyaddviewer');
let AuthButton = require('./authbutton');
let AuthViewer = require('./authviewer');
let AddCompanyButton = require('./addcompanybutton');

  let dataToStore = JSON.stringify(localDefaultCompanies);
  localStorage.setItem('companies', dataToStore);
  let defaultCompanies = JSON.parse(localStorage.getItem('companies'));


class Page extends BaseFunc {
  constructor(options) {
    super();
    this._el = options.element;



    this._addCompanyButton = new AddCompanyButton({
      element: this._el.querySelector('[data-component="addcompanybutton"]')
    });
    this._authButton = new AuthButton({
      element: this._el.querySelector('[data-component="authbutton"]')
    });

    this._companyCatalogue = new CompanyCatalogue({
      element: this._el.querySelector('[data-component="companyCatalogue"]'),
      companies: defaultCompanies
    });

    this._companyEditViewer = new CompanyEditViewer({
      element: this._el.querySelector('[data-component="companyEditViewer"]')
    });
    this._companyAddViewer = new CompanyAddViewer({
      element: this._el.querySelector('[data-component="companyAddViewer"]')
    });
    this._authViewer = new AuthViewer({
      element: this._el.querySelector('[data-component="authViewer"]')
    });
    this._companyEditViewer.hide();
    this._authViewer.hide();
    this._companyAddViewer.hide()
    this._authButton.render();
    this._addCompanyButton.render();
    this._companyCatalogue.getElement().addEventListener('editCompany', this._onEditCompany.bind(this)); 
    this._companyCatalogue.getElement().addEventListener('deleteCompany', this._onDeleteCompany.bind(this));
    this._authButton.getElement().addEventListener('authButtonPress', this._onAuthButtonPress.bind(this)); 
    this._authViewer.getElement().addEventListener('authViewerOk', this._onAuthButtonOk.bind(this)); 
    this._authViewer.getElement().addEventListener('authViewerCancel', this._onAuthButtonCancel.bind(this)); 
    this._companyEditViewer.getElement().addEventListener('editViewerCompanyOk', this._onEditViewerCompanyOk.bind(this)); 
    this._companyEditViewer.getElement().addEventListener('editViewerCompanyCancel', this._onEditViewerCompanyCancel.bind(this));
    this._addCompanyButton.getElement().addEventListener('addCompanyButton', this._onAddCompanyButton.bind(this));
    this._companyAddViewer.getElement().addEventListener('addViewerCompanyOk', this._onAddViewerCompanyOk.bind(this)); 
    this._companyAddViewer.getElement().addEventListener('addViewerCompanyCancel', this._onAddViewerCompanyCancel.bind(this));
  }


  _getCompanyIdFromJSON(companyID, func) {
    for(let i = 0; i < defaultCompanies.length; i++) {

      if(+defaultCompanies[i].id === +companyID) {
        func.call(this, i);
        return;
      }
    }
  }

  _onEditCompany(event) {

    this._getCompanyIdFromJSON(event.detail, function(i){
            this._companyCatalogue.hide();
            this._companyEditViewer.render(defaultCompanies[i]);
            this._companyEditViewer.show();        
      });
            

  }
  _onDeleteCompany(event) {
        this._getCompanyIdFromJSON(event.detail, function(i){
          defaultCompanies.splice(i, 1);
          this._companyCatalogue.render();
        });
  }
  _onAddCompanyButton(event) {
      this._companyCatalogue.hide();
      this._companyEditViewer.hide();
      let cookieInn = this.getCookie('authinn');
      this._companyAddViewer.render(cookieInn);      
      this._companyAddViewer.show();


  }
  _onAuthButtonPress(event) {

    if (this.isLogin()) {
      this.deleteCookie('authinn');
      this._authButton.render();
      this._companyAddViewer.hide();
      this._companyEditViewer.hide();
      this._companyCatalogue.show();
      this._addCompanyButton.render();
      

    } else {
    this._companyCatalogue.hide();
    this._authViewer.show();
    }

  }
  _onAuthButtonOk(event) {
    if(!event.detail) {
      return;
    }
    this.setCookie('authinn', event.detail, {
      path: "/"
    });
    this._authViewer.hide();
    this._companyCatalogue.show();
    this._addCompanyButton.render();

    this._authButton.render();
    
  }
  _onAuthButtonCancel(event) {
    
    this._authViewer.hide();
    this._companyCatalogue.show();
    this._addCompanyButton.render();

    
  }
  _onEditViewerCompanyCancel(event) {

    this._companyEditViewer.hide();
    this._companyCatalogue.show();
  }
  _onEditViewerCompanyOk(event) {
        this._getCompanyIdFromJSON(event.detail.id, function(i){
            let companyObject = defaultCompanies[i];
            companyObject.id = event.detail.id;
            companyObject.inn = event.detail.inn;
            companyObject.company = event.detail.name;
            companyObject.boss = event.detail.boss;
        });
    this._companyEditViewer.hide();
    this._companyCatalogue.show();
  }
  _onAddViewerCompanyOk(event) {
    let nextJSONID = +defaultCompanies[(defaultCompanies.length - 1)].id + 1;

    defaultCompanies.push({
      "id": nextJSONID,
      "inn": event.detail.inn,
      "company": event.detail.name,
      "boss": event.detail.boss
    })
    //let dataToStore = JSON.stringify(defaultCompanies);
    //localStorage.setItem('companies', dataToStore);
    //defaultCompanies = JSON.parse(localStorage.getItem('companies'));

    this._companyAddViewer.hide();
    this._companyCatalogue.show();
  }
  _onAddViewerCompanyCancel(event) {

    this._companyAddViewer.hide();
    this._companyCatalogue.show();
  }
}

module.exports = Page;