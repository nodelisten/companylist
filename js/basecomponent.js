'use strict';
let BaseFunc = require('./basefunc');
class BaseComponent extends BaseFunc {
  constructor(options) {
  	super();
    this._el = options.element;


  }
  hide() {
  	this._el.classList.add('js-hidden');
  };
  show() {
  	this._el.classList.remove('js-hidden');
  };
  getElement() {
    return this._el;
  }
}
module.exports = BaseComponent;