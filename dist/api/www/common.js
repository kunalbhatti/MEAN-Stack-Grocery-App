(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "74mu":
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/theme-ff3fc52f.js ***!
  \*************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
const hostContext = (selector, el) => {
  return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
const createColorClasses = (color, cssClassMap) => {
  return (typeof color === 'string' && color.length > 0) ? Object.assign({ 'ion-color': true, [`ion-color-${color}`]: true }, cssClassMap) : cssClassMap;
};
const getClassList = (classes) => {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ');
    return array
      .filter(c => c != null)
      .map(c => c.trim())
      .filter(c => c !== '');
  }
  return [];
};
const getClassMap = (classes) => {
  const map = {};
  getClassList(classes).forEach(c => map[c] = true);
  return map;
};
const SCHEME = /^[a-z][a-z0-9+\-.]*:/;
const openURL = async (url, ev, direction, animation) => {
  if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
    const router = document.querySelector('ion-router');
    if (router) {
      if (ev != null) {
        ev.preventDefault();
      }
      return router.push(url, direction, animation);
    }
  }
  return false;
};




/***/ }),

/***/ "A2gu":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/framework-delegate-bda125fb.js ***!
  \**************************************************************************/
/*! exports provided: a, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return detachComponent; });
/* harmony import */ var _helpers_cf6e85ee_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers-cf6e85ee.js */ "Ke8Y");


const attachComponent = async (delegate, container, component, cssClasses, componentProps) => {
  if (delegate) {
    return delegate.attachViewToDom(container, component, componentProps, cssClasses);
  }
  if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
    throw new Error('framework delegate is missing');
  }
  const el = (typeof component === 'string')
    ? container.ownerDocument && container.ownerDocument.createElement(component)
    : component;
  if (cssClasses) {
    cssClasses.forEach(c => el.classList.add(c));
  }
  if (componentProps) {
    Object.assign(el, componentProps);
  }
  container.appendChild(el);
  await new Promise(resolve => Object(_helpers_cf6e85ee_js__WEBPACK_IMPORTED_MODULE_0__["c"])(el, resolve));
  return el;
};
const detachComponent = (delegate, element) => {
  if (element) {
    if (delegate) {
      const container = element.parentElement;
      return delegate.removeViewFromDom(container, element);
    }
    element.remove();
  }
  return Promise.resolve();
};




/***/ }),

/***/ "D7eQ":
/*!***********************************************!*\
  !*** ./src/app/services/searchbar.service.ts ***!
  \***********************************************/
/*! exports provided: SearchBarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarService", function() { return SearchBarService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config.json */ "/Sxv");
var _config_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config.json */ "/Sxv", 1);
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error.handler */ "Dg0I");
/* harmony import */ var _settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings.service */ "6nr9");







let SearchBarService = class SearchBarService {
    constructor(http, settingsService) {
        this.http = http;
        this.settingsService = settingsService;
    }
    getProductList(searchStr, cid) {
        this.currentGroup = this.settingsService.settings.currentGroup;
        return this.http.get(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}products/filter-products/?searchStr=${searchStr}&cid=${cid}&gid=${this.currentGroup}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
    }
    getProductExpense(searchStr, date, cid, selectedView) {
        this.currentGroup = this.settingsService.settings.currentGroup;
        return this.http.get(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}expenses/get-product-expense/?searchStr=${searchStr}&date=${JSON.stringify(date)}&cid=${cid}&gid=${this.currentGroup}&view=${selectedView}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
    }
};
SearchBarService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"] }
];
SearchBarService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], SearchBarService);



/***/ }),

/***/ "Dk0r":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/settings/manage-app/modals/create-product/create-product.component.html ***!
  \************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>{{product?.name ? \"Edit Product\": \"Create Product\"}}</ion-title>\n    <ion-buttons slot=\"primary\">\n      <ion-button (click)=\"onDismiss()\">\n        <ion-icon name=\"close-outline\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row style=\"background-color: rgb(40, 41, 44);\">\n      <ion-col size=\"12\">\n        <form (ngSubmit)=\"product?.name ? editProduct(createProductForm): addProduct(createProductForm)\"\n          #createProductForm=\"ngForm\">\n          <ion-item lines=\"none\">\n            <ion-label position=\"floating\">Name <small>(Required)</small></ion-label>\n            <ion-input [ngModel]=\"product?.name\" name=\"name\" required minlength=\"2\" maxlength=\"20\"></ion-input>\n          </ion-item>\n          <ion-item lines=\"none\">\n            <ion-label position=\"floating\">Brand</ion-label>\n            <ion-input [ngModel]=\"product?.brand\" name=\"brand\" minlength=\"2\" maxlength=\"20\"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label>Size</ion-label>\n            <ion-select okText=\"Okay\" cancelText=\"Dismiss\" [ngModel]=\"product?.size\" name=\"size\">\n              <ion-select-option value=\"small\">Small</ion-select-option>\n              <ion-select-option value=\"medium\">Medium</ion-select-option>\n              <ion-select-option value=\"large\">Large</ion-select-option>\n            </ion-select>\n          </ion-item>\n          <ion-row>\n            <ion-col size=\"6\" class=\"ion-no-padding\">\n              <ion-item lines=\"none\">\n                <ion-label position=\"floating\">Quantity</ion-label>\n                <ion-input [ngModel]=\"product?.quantity\" name=\"quantity\" min=\"1\" type=\"number\"></ion-input>\n              </ion-item>\n            </ion-col>\n            <ion-col size=\"6\" class=\"ion-no-padding\">\n              <ion-item lines=\"none\">\n                <ion-label position=\"floating\">Unit</ion-label>\n                <ion-select okText=\"Okay\" cancelText=\"Dismiss\" [ngModel]=\"product?.unit\" name=\"unit\">\n                  <ion-select-option value=\"kilo gram(s)\">Kilo Gram(s)</ion-select-option>\n                  <ion-select-option value=\"gram(s)\">Gram(s)</ion-select-option>\n                  <ion-select-option value=\"liter(s)\">Liter(s)</ion-select-option>\n                  <ion-select-option value=\"mili liter(s)\">Mili Lilter(s)</ion-select-option>\n                  <ion-select-option value=\"\">None</ion-select-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-item lines=\"none\">\n            <ion-label position=\"floating\">Price <small>(Required)</small></ion-label>\n            <ion-input [ngModel]=\"product?.price\" name=\"price\" required min=\"1\" type=\"number\"></ion-input>\n          </ion-item>\n          <ion-input hidden [ngModel]=\"product?._id\" name=\"_id\"></ion-input>\n          <ion-input hidden [ngModel]=\"cid\" name=\"cid\"></ion-input>\n          <ion-button type=\"submit\" expand=\"full\" color=\"primary\" [disabled]=\"createProductForm.invalid\">\n            {{product?.name ? \"Edit\": \"Create\"}}\n          </ion-button>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "OVtC":
/*!********************************************************************************************!*\
  !*** ./src/app/main/settings/manage-app/modals/confirm-delete/confirm-delete.component.ts ***!
  \********************************************************************************************/
/*! exports provided: ConfirmDeleteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmDeleteComponent", function() { return ConfirmDeleteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_confirm_delete_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./confirm-delete.component.html */ "X5Be");
/* harmony import */ var _confirm_delete_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./confirm-delete.component.scss */ "qHjq");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let ConfirmDeleteComponent = class ConfirmDeleteComponent {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    ngOnInit() { }
    onDismiss() {
        this.popoverController.dismiss(null, 'cancel');
    }
    onDelete() {
        this.popoverController.dismiss(null, 'delete');
    }
};
ConfirmDeleteComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] }
];
ConfirmDeleteComponent.propDecorators = {
    type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    message: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
ConfirmDeleteComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-confirm-delete',
        template: _raw_loader_confirm_delete_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_confirm_delete_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ConfirmDeleteComponent);



/***/ }),

/***/ "R+U0":
/*!********************************************************************************************!*\
  !*** ./src/app/main/settings/manage-app/modals/create-product/create-product.component.ts ***!
  \********************************************************************************************/
/*! exports provided: CreateProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateProductComponent", function() { return CreateProductComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_create_product_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./create-product.component.html */ "Dk0r");
/* harmony import */ var _create_product_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-product.component.scss */ "hS6O");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _services_toaster_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../../../services/toaster.service */ "Ymxs");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../../../services/settings.service */ "6nr9");







let CreateProductComponent = class CreateProductComponent {
    constructor(modalController, settingsService, toasterService) {
        this.modalController = modalController;
        this.settingsService = settingsService;
        this.toasterService = toasterService;
    }
    ngOnInit() { }
    onDismiss() {
        this.modalController.dismiss(null, 'cancel');
    }
    addProduct(form) {
        this.settingsService.addProduct(form.value).subscribe((result) => {
            this.modalController.dismiss(result.product, 'create');
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        });
    }
    editProduct(form) {
        form.value.stockCount = this.product.stockCount;
        form.value.stockStatus = this.product.stockStatus;
        this.settingsService.editProduct(form.value).subscribe((result) => {
            this.modalController.dismiss(result.product, 'edit');
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        });
    }
};
CreateProductComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"] },
    { type: _services_toaster_service__WEBPACK_IMPORTED_MODULE_5__["ToasterService"] }
];
CreateProductComponent.propDecorators = {
    product: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    cid: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
CreateProductComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-create-product',
        template: _raw_loader_create_product_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_create_product_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CreateProductComponent);



/***/ }),

/***/ "X5Be":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/settings/manage-app/modals/confirm-delete/confirm-delete.component.html ***!
  \************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar class=\"ion-text-center\">\n    <ion-title>Delete {{type}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col size=\"12\" class=\"ion-text-center\">\n        <ion-text>\n          {{message}}\n        </ion-text>\n      </ion-col>\n      <ion-col size=\"12\" class=\"ion-text-center\">\n        <ion-button color=\"primary\" (click)=\"onDismiss()\">Cancel</ion-button>\n        <ion-button color=\"danger\" (click)=\"onDelete()\">Delete</ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "Ymxs":
/*!*********************************************!*\
  !*** ./src/app/services/toaster.service.ts ***!
  \*********************************************/
/*! exports provided: ToasterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToasterService", function() { return ToasterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "TEn/");



let ToasterService = class ToasterService {
    constructor(toastController) {
        this.toastController = toastController;
    }
    presentToast(header, message, duration, color) {
        this.toastController.create({
            header,
            message,
            duration,
            color,
            buttons: [{
                    icon: 'close-outline',
                    role: 'cancel'
                }]
        }).then((toastEl) => {
            toastEl.present();
        });
    }
};
ToasterService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] }
];
ToasterService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ToasterService);



/***/ }),

/***/ "c14U":
/*!******************************************!*\
  !*** ./src/app/services/cart.service.ts ***!
  \******************************************/
/*! exports provided: CartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartService", function() { return CartService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config.json */ "/Sxv");
var _config_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config.json */ "/Sxv", 1);
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error.handler */ "Dg0I");






let CartService = class CartService {
    constructor(http) {
        this.http = http;
    }
    getCart(gid, cid) {
        return this.http.get(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}products/get-cart/?gid=${gid}&cid=${cid}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
    }
    updateCartCount(productId, count, gid) {
        return this.http.patch(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}products/update-cart-count/${productId}`, {
            count,
            gid
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
    }
};
CartService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
CartService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], CartService);



/***/ }),

/***/ "h3R7":
/*!***********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/spinner-configs-cd7845af.js ***!
  \***********************************************************************/
/*! exports provided: S */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return SPINNERS; });
const spinners = {
  'bubbles': {
    dur: 1000,
    circles: 9,
    fn: (dur, index, total) => {
      const animationDelay = `${(dur * index / total) - dur}ms`;
      const angle = 2 * Math.PI * index / total;
      return {
        r: 5,
        style: {
          'top': `${9 * Math.sin(angle)}px`,
          'left': `${9 * Math.cos(angle)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'circles': {
    dur: 1000,
    circles: 8,
    fn: (dur, index, total) => {
      const step = index / total;
      const animationDelay = `${(dur * step) - dur}ms`;
      const angle = 2 * Math.PI * step;
      return {
        r: 5,
        style: {
          'top': `${9 * Math.sin(angle)}px`,
          'left': `${9 * Math.cos(angle)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'circular': {
    dur: 1400,
    elmDuration: true,
    circles: 1,
    fn: () => {
      return {
        r: 20,
        cx: 48,
        cy: 48,
        fill: 'none',
        viewBox: '24 24 48 48',
        transform: 'translate(0,0)',
        style: {}
      };
    }
  },
  'crescent': {
    dur: 750,
    circles: 1,
    fn: () => {
      return {
        r: 26,
        style: {}
      };
    }
  },
  'dots': {
    dur: 750,
    circles: 3,
    fn: (_, index) => {
      const animationDelay = -(110 * index) + 'ms';
      return {
        r: 6,
        style: {
          'left': `${9 - (9 * index)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'lines': {
    dur: 1000,
    lines: 12,
    fn: (dur, index, total) => {
      const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
      const animationDelay = `${(dur * index / total) - dur}ms`;
      return {
        y1: 17,
        y2: 29,
        style: {
          'transform': transform,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'lines-small': {
    dur: 1000,
    lines: 12,
    fn: (dur, index, total) => {
      const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
      const animationDelay = `${(dur * index / total) - dur}ms`;
      return {
        y1: 12,
        y2: 20,
        style: {
          'transform': transform,
          'animation-delay': animationDelay,
        }
      };
    }
  }
};
const SPINNERS = spinners;




/***/ }),

/***/ "hS6O":
/*!**********************************************************************************************!*\
  !*** ./src/app/main/settings/manage-app/modals/create-product/create-product.component.scss ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjcmVhdGUtcHJvZHVjdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "pX2f":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/button-active-e272e3f1.js ***!
  \*********************************************************************/
/*! exports provided: c */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createButtonActiveGesture; });
/* harmony import */ var _index_3ccd7557_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-3ccd7557.js */ "2atR");
/* harmony import */ var _index_f49d994d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-f49d994d.js */ "iWo5");
/* harmony import */ var _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./haptic-27b3f981.js */ "qULd");




const createButtonActiveGesture = (el, isButton) => {
  let currentTouchedButton;
  let initialTouchedButton;
  const activateButtonAtPoint = (x, y, hapticFeedbackFn) => {
    if (typeof document === 'undefined') {
      return;
    }
    const target = document.elementFromPoint(x, y);
    if (!target || !isButton(target)) {
      clearActiveButton();
      return;
    }
    if (target !== currentTouchedButton) {
      clearActiveButton();
      setActiveButton(target, hapticFeedbackFn);
    }
  };
  const setActiveButton = (button, hapticFeedbackFn) => {
    currentTouchedButton = button;
    if (!initialTouchedButton) {
      initialTouchedButton = currentTouchedButton;
    }
    const buttonToModify = currentTouchedButton;
    Object(_index_3ccd7557_js__WEBPACK_IMPORTED_MODULE_0__["c"])(() => buttonToModify.classList.add('ion-activated'));
    hapticFeedbackFn();
  };
  const clearActiveButton = (dispatchClick = false) => {
    if (!currentTouchedButton) {
      return;
    }
    const buttonToModify = currentTouchedButton;
    Object(_index_3ccd7557_js__WEBPACK_IMPORTED_MODULE_0__["c"])(() => buttonToModify.classList.remove('ion-activated'));
    /**
     * Clicking on one button, but releasing on another button
     * does not dispatch a click event in browsers, so we
     * need to do it manually here. Some browsers will
     * dispatch a click if clicking on one button, dragging over
     * another button, and releasing on the original button. In that
     * case, we need to make sure we do not cause a double click there.
     */
    if (dispatchClick && initialTouchedButton !== currentTouchedButton) {
      currentTouchedButton.click();
    }
    currentTouchedButton = undefined;
  };
  return Object(_index_f49d994d_js__WEBPACK_IMPORTED_MODULE_1__["createGesture"])({
    el,
    gestureName: 'buttonActiveDrag',
    threshold: 0,
    onStart: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["a"]),
    onMove: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["b"]),
    onEnd: () => {
      clearActiveButton(true);
      Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["h"])();
      initialTouchedButton = undefined;
    }
  });
};




/***/ }),

/***/ "qHjq":
/*!**********************************************************************************************!*\
  !*** ./src/app/main/settings/manage-app/modals/confirm-delete/confirm-delete.component.scss ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb25maXJtLWRlbGV0ZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "qULd":
/*!**************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/haptic-27b3f981.js ***!
  \**************************************************************/
/*! exports provided: a, b, c, d, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hapticImpact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticSelectionEnd; });
const HapticEngine = {
  getEngine() {
    const win = window;
    return (win.TapticEngine) || (win.Capacitor && win.Capacitor.isPluginAvailable('Haptics') && win.Capacitor.Plugins.Haptics);
  },
  available() {
    return !!this.getEngine();
  },
  isCordova() {
    return !!window.TapticEngine;
  },
  isCapacitor() {
    const win = window;
    return !!win.Capacitor;
  },
  impact(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
    engine.impact({ style });
  },
  notification(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
    engine.notification({ style });
  },
  selection() {
    this.impact({ style: 'light' });
  },
  selectionStart() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionStart();
    }
    else {
      engine.gestureSelectionStart();
    }
  },
  selectionChanged() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionChanged();
    }
    else {
      engine.gestureSelectionChanged();
    }
  },
  selectionEnd() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionEnd();
    }
    else {
      engine.gestureSelectionEnd();
    }
  }
};
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
const hapticSelection = () => {
  HapticEngine.selection();
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
const hapticSelectionStart = () => {
  HapticEngine.selectionStart();
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
const hapticSelectionChanged = () => {
  HapticEngine.selectionChanged();
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
const hapticSelectionEnd = () => {
  HapticEngine.selectionEnd();
};
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
 */
const hapticImpact = (options) => {
  HapticEngine.impact(options);
};




/***/ }),

/***/ "rRBh":
/*!***********************************************!*\
  !*** ./src/app/services/inventory.service.ts ***!
  \***********************************************/
/*! exports provided: InventoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryService", function() { return InventoryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config.json */ "/Sxv");
var _config_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config.json */ "/Sxv", 1);
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error.handler */ "Dg0I");
/* harmony import */ var _settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings.service */ "6nr9");







let InventoryService = class InventoryService {
    constructor(http, settingsService) {
        this.http = http;
        this.settingsService = settingsService;
    }
    getInventory(getProductView, cid) {
        this.currentGroup = this.settingsService.settings.currentGroup;
        return this.http.get(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}products/get-inventory/?cid=${cid}&gid=${this.currentGroup}&getProductsView=${getProductView}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((products) => {
            for (let product of products) {
                if (!product.stockCount) {
                    product['stockCount'] = {
                        [this.currentGroup]: 0
                    };
                }
                if (!product.stockStatus) {
                    product['stockStatus'] = {
                        [this.currentGroup]: ''
                    };
                }
            }
            return products;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
    }
    updateStockCount(productId, count, gid) {
        return this.http.patch(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}products/update-stock-count/${productId}`, {
            count,
            gid
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
    }
    updateStockStatus(productId, status, gid) {
        return this.http.patch(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}products/update-stock-status/${productId}`, {
            status,
            gid
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
    }
};
InventoryService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"] }
];
InventoryService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], InventoryService);



/***/ }),

/***/ "svBU":
/*!*********************************************!*\
  !*** ./src/app/services/expense.service.ts ***!
  \*********************************************/
/*! exports provided: ExpenseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpenseService", function() { return ExpenseService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config.json */ "/Sxv");
var _config_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config.json */ "/Sxv", 1);
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error.handler */ "Dg0I");






let ExpenseService = class ExpenseService {
    constructor(http) {
        this.http = http;
    }
    getExpense(month, year, gid, selectedView) {
        return this.http.get(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}expenses/get-expense/?month=${month}&year=${year}&gid=${gid}&view=${selectedView}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
    }
    addExpense(expense) {
        return this.http.post(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}expenses/add-expense`, expense).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
        ;
    }
    updateExpense(eid, update) {
        return this.http.patch(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}expenses/update-expense/`, {
            eid,
            update
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
        ;
    }
    deleteExpense(eid) {
        return this.http.delete(`${_config_json__WEBPACK_IMPORTED_MODULE_4__["url"]}expenses/delete-expense/${eid}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]));
        ;
    }
};
ExpenseService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
ExpenseService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], ExpenseService);



/***/ })

}]);
//# sourceMappingURL=common.js.map