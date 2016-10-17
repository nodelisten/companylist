'use strict';
const BaseComponent = require('./basecomponent');

class AuthViewer extends BaseComponent {
  constructor(options) {
    super(options.element);
    this._el = options.element;
    this._el.addEventListener('click', this._onAuthButtonsClick.bind(this));

  }

  _onAuthButtonsClick(event) {

        event.preventDefault();
        let inputInnValue = document.querySelector('[data-element="inn"]').value.trim();
        if (event.target.closest('[data-element="authViewerOk"]')) {
          this._triggerAuthButtonsClick('authViewerOk', inputInnValue);
        }
        if (event.target.closest('[data-element="authViewerCancel"]')) {
          this._triggerAuthButtonsClick('authViewerCancel');
        }
        
  }
  _triggerAuthButtonsClick(newEvent, detail) {
          detail = detail || 0;
          let customEvent = new CustomEvent(newEvent, {
            detail: detail
          });
          this._el.dispatchEvent(customEvent);  
  }
}

module.exports = AuthViewer;