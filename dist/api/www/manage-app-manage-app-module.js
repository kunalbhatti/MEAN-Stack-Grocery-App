(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-app-manage-app-module"],{

/***/ "/8ZT":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
  \***************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringify.js */ "WM9j");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "DeoT");



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = Object(_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "1M+P":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/nil.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('00000000-0000-0000-0000-000000000000');

/***/ }),

/***/ "2Pgj":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "4USb":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
  \*****************************************************/
/*! exports provided: v1, v3, v4, v5, NIL, version, validate, stringify, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "xQqG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "VKuO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "7Cbv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "Jr8q");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ "1M+P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NIL", function() { return _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ "dugQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _version_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ "BuRe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return _validate_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ "WM9j");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return _stringify_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ "DeoT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return _parse_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });











/***/ }),

/***/ "7Cbv":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "2Pgj");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "WM9j");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "BuRe":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "QNZY");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ __webpack_exports__["default"] = (validate);

/***/ }),

/***/ "Ct/w":
/*!***********************************************************************!*\
  !*** ./src/app/main/settings/manage-app/manage-app-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: ManageAppPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageAppPageRoutingModule", function() { return ManageAppPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _manage_app_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manage-app.page */ "h2TT");




const routes = [
    {
        path: '',
        component: _manage_app_page__WEBPACK_IMPORTED_MODULE_3__["ManageAppPage"]
    }
];
let ManageAppPageRoutingModule = class ManageAppPageRoutingModule {
};
ManageAppPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ManageAppPageRoutingModule);



/***/ }),

/***/ "DeoT":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/parse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "BuRe");


function parse(uuid) {
  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ __webpack_exports__["default"] = (parse);

/***/ }),

/***/ "Jr8q":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "/8ZT");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "t133");


var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "PPoh":
/*!***************************************************************!*\
  !*** ./src/app/main/settings/manage-app/manage-app.module.ts ***!
  \***************************************************************/
/*! exports provided: ManageAppPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageAppPageModule", function() { return ManageAppPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modals/confirm-delete/confirm-delete.component */ "OVtC");
/* harmony import */ var _modals_create_product_create_product_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modals/create-product/create-product.component */ "R+U0");
/* harmony import */ var _manage_app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./manage-app-routing.module */ "Ct/w");
/* harmony import */ var _manage_app_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./manage-app.page */ "h2TT");









let ManageAppPageModule = class ManageAppPageModule {
};
ManageAppPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _manage_app_routing_module__WEBPACK_IMPORTED_MODULE_7__["ManageAppPageRoutingModule"]
        ],
        declarations: [_manage_app_page__WEBPACK_IMPORTED_MODULE_8__["ManageAppPage"], _modals_create_product_create_product_component__WEBPACK_IMPORTED_MODULE_6__["CreateProductComponent"], _modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_5__["ConfirmDeleteComponent"]]
    })
], ManageAppPageModule);



/***/ }),

/***/ "QNZY":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "VKuO":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "/8ZT");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "tysn");


var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "WM9j":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "BuRe");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ __webpack_exports__["default"] = (stringify);

/***/ }),

/***/ "cUJx":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/settings/manage-app/manage-app.page.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Manage App</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n\n  <ion-grid>\n    <ion-row class=\"ion-justify-content-center\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\">\n\n        <ion-toolbar size=\"12\" class=\"ion-text-center ion-margin-top\" style=\"background-color: #1f1f1f;\">\n          <ion-title class=\"title-center\">Groups</ion-title>\n          <ion-buttons slot=\"primary\">\n            <ion-button (click)=\"addGroupForm = !addGroupForm; selectedGroup = ''\" [disabled]=\"groups?.length === 3\">\n              <ion-icon name=\"add-outline\" *ngIf=\"!addGroupForm\" slot=\"icon-only\"></ion-icon>\n              <ion-icon name=\"close\" *ngIf=\"addGroupForm\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n        <ion-row style=\"background-color: rgb(40, 41, 44);\">\n          <ion-col size=\"12\" *ngIf=\"addGroupForm\">\n            <form (ngSubmit)=\"addGroup(createGroupForm)\" #createGroupForm=\"ngForm\" *ngIf=\"!selectedGroup\">\n              <ion-item lines=\"none\">\n                <ion-input ngModel name=\"group\" placeholder=\"Add Group\" required minlength=\"3\" maxlength=\"20\">\n                </ion-input>\n                <ion-button type=\"submit\" fill=\"clear\" color=\"dark\" [disabled]=\"createGroupForm.invalid\">\n                  Add\n                </ion-button>\n              </ion-item>\n            </form>\n            <form (ngSubmit)=\"editGroup(updateGroupForm)\" #updateGroupForm=\"ngForm\" *ngIf=\"selectedGroup\">\n              <ion-item lines=\"none\">\n                <ion-input [ngModel]=\"selectedGroup.group\" name=\"group\" placeholder=\"Edit Group\" required minlength=\"3\"\n                  maxlength=\"20\"></ion-input>\n                <ion-button type=\"submit\" fill=\"clear\" color=\"dark\" [disabled]=\"updateGroupForm.invalid\">\n                  Update\n                </ion-button>\n              </ion-item>\n            </form>\n          </ion-col>\n          <ion-col size=\"12\" class=\"ion-text-center\"\n            [ngClass]=\"{'ion-padding': groupError === '' && groups?.length === 0}\">\n            <ion-list *ngIf=\"groupError === '' && groups?.length > 0\">\n              <ion-radio-group [value]=\"currentGroup\" #currentGrp (ionChange)=\"setCurrentGroup(currentGrp.value)\">\n                <ion-item *ngFor=\"let group of groups;\">\n                  <ion-radio slot=\"start\" [value]=\"getKeyVal(group).key\"></ion-radio>\n                  <ion-label>{{getKeyVal(group).value | titlecase}}</ion-label>\n                  <ion-button fill=\"clear\"\n                    (click)=\"presentGroupActionSheet(getKeyVal(group).value, getKeyVal(group).key)\">\n                    <ion-icon name=\"ellipsis-vertical\" color=\"dark\"></ion-icon>\n                  </ion-button>\n                </ion-item>\n              </ion-radio-group>\n            </ion-list>\n            <ion-text *ngIf=\"groupError === '' && groups?.length === 0\">No Items Found</ion-text>\n            <ion-text *ngIf=\"groupError !== ''\">{{groupError}}</ion-text>\n          </ion-col>\n        </ion-row>\n\n        <ion-toolbar size=\"12\" class=\"ion-text-center ion-margin-top\" style=\"background-color: #1f1f1f;\">\n          <ion-title class=\"title-center\">Categories</ion-title>\n          <ion-buttons slot=\"primary\">\n            <ion-button (click)=\"addCategoryForm = !addCategoryForm; selectedCategory = ''\">\n              <ion-icon name=\"add-outline\" *ngIf=\"!addCategoryForm\" slot=\"icon-only\"></ion-icon>\n              <ion-icon name=\"close\" *ngIf=\"addCategoryForm\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n        <ion-row style=\"background-color: rgb(40, 41, 44);\">\n          <ion-col size=\"12\" *ngIf=\"addCategoryForm\">\n            <form (ngSubmit)=\"addCategory(createCategoryForm)\" #createCategoryForm=\"ngForm\" *ngIf=\"!selectedCategory\">\n              <ion-item lines=\"none\">\n                <ion-input ngModel name=\"category\" placeholder=\"Add Category\" required minlength=\"3\" maxlength=\"20\">\n                </ion-input>\n                <ion-button type=\"submit\" fill=\"clear\" color=\"dark\" [disabled]=\"createCategoryForm.invalid\">\n                  Add\n                </ion-button>\n              </ion-item>\n            </form>\n            <form (ngSubmit)=\"editCategory(updateCategoryForm)\" #updateCategoryForm=\"ngForm\" *ngIf=\"selectedCategory\">\n              <ion-item lines=\"none\">\n                <ion-input [ngModel]=\"selectedCategory.category\" name=\"category\" placeholder=\"Edit Category\" required\n                  minlength=\"3\" maxlength=\"20\"></ion-input>\n                <ion-button type=\"submit\" fill=\"clear\" color=\"dark\" [disabled]=\"updateCategoryForm.invalid\">\n                  Update\n                </ion-button>\n              </ion-item>\n            </form>\n          </ion-col>\n          <ion-col size=\"12\" class=\"ion-text-center\"\n            [ngClass]=\"{'ion-padding': categoryError === '' && categories?.length === 0}\">\n            <ion-list *ngIf=\"categoryError === '' && categories?.length > 0\">\n              <ion-item *ngFor=\"let category of categories;\">\n                <ion-label [innerText]=\"getKeyVal(category).value | titlecase\"></ion-label>\n                <ion-button fill=\"clear\"\n                  (click)=\"presentCategoryActionSheet(getKeyVal(category).value, getKeyVal(category).key)\">\n                  <ion-icon name=\"ellipsis-vertical\" color=\"dark\"></ion-icon>\n                </ion-button>\n              </ion-item>\n            </ion-list>\n            <ion-text *ngIf=\"categoryError === '' && categories?.length === 0\">No Items Found</ion-text>\n            <ion-text *ngIf=\"categoryError !== ''\">{{categoryError}}</ion-text>\n          </ion-col>\n        </ion-row>\n\n        <ion-toolbar size=\"12\" class=\"ion-text-center ion-margin-top\" style=\"background-color: #1f1f1f;\">\n          <ion-title class=\"title-center\">Expenses</ion-title>\n          <ion-buttons slot=\"primary\">\n            <ion-button (click)=\"addExpenseForm = !addExpenseForm; selectedExpense = ''\">\n              <ion-icon name=\"add-outline\" *ngIf=\"!addExpenseForm\" slot=\"icon-only\"></ion-icon>\n              <ion-icon name=\"close\" *ngIf=\"addExpenseForm\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n        <ion-row style=\"background-color: rgb(40, 41, 44);\">\n          <ion-col size=\"12\" *ngIf=\"addExpenseForm\">\n            <form (ngSubmit)=\"addExpense(createExpenseForm)\" #createExpenseForm=\"ngForm\" *ngIf=\"!selectedExpense\">\n              <ion-item lines=\"none\">\n                <ion-input ngModel name=\"expense\" placeholder=\"Add Expense\" required minlength=\"3\" maxlength=\"20\">\n                </ion-input>\n                <ion-button type=\"submit\" fill=\"clear\" color=\"dark\" [disabled]=\"createExpenseForm.invalid\">\n                  Add\n                </ion-button>\n              </ion-item>\n            </form>\n            <form (ngSubmit)=\"editExpense(updateExpenseForm)\" #updateExpenseForm=\"ngForm\" *ngIf=\"selectedExpense\">\n              <ion-item lines=\"none\">\n                <ion-input [ngModel]=\"selectedExpense.expense\" name=\"expense\" placeholder=\"Edit Expense\" required\n                  minlength=\"3\" maxlength=\"20\"></ion-input>\n                <ion-button type=\"submit\" fill=\"clear\" color=\"dark\" [disabled]=\"updateExpenseForm.invalid\">\n                  Update\n                </ion-button>\n              </ion-item>\n            </form>\n          </ion-col>\n          <ion-col size=\"12\" class=\"ion-text-center\"\n            [ngClass]=\"{'ion-padding': expenseError === '' && expenses?.length === 0}\">\n            <ion-list *ngIf=\"expenseError === '' && expenses?.length > 0\">\n              <ion-item *ngFor=\"let expense of expenses;\">\n                <ion-label [innerText]=\"getKeyVal(expense).value | titlecase\"></ion-label>\n                <ion-button fill=\"clear\"\n                  (click)=\"presentExpenseActionSheet(getKeyVal(expense).value, getKeyVal(expense).key)\">\n                  <ion-icon name=\"ellipsis-vertical\" color=\"dark\"></ion-icon>\n                </ion-button>\n              </ion-item>\n            </ion-list>\n            <ion-text *ngIf=\"expenseError === '' && expenses?.length === 0\">No Items Found</ion-text>\n            <ion-text *ngIf=\"expenseError !== ''\">{{expenseError}}</ion-text>\n          </ion-col>\n        </ion-row>\n\n        <ion-toolbar size=\"12\" class=\"ion-text-center ion-margin-top\" style=\"background-color: #1f1f1f;\">\n          <ion-title>Inventory View</ion-title>\n        </ion-toolbar>\n\n        <ion-row style=\"background-color: rgb(40, 41, 44);\">\n          <ion-col size=\"12\">\n            <ion-radio-group name=\"getProductView\" [value] = \"settings.getProductsView\" (ionChange)=\"updateGetProductView(productView.value)\" #productView>\n              <ion-item>\n                <ion-label>View all products</ion-label>\n                <ion-radio slot=\"start\" value=\"all\"></ion-radio>\n              </ion-item>\n              <ion-item>\n                <ion-label>View products in stock</ion-label>\n                <ion-radio slot=\"start\" value=\"partial\"></ion-radio>\n              </ion-item>\n            </ion-radio-group>\n          </ion-col>\n        </ion-row>\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n");

/***/ }),

/***/ "dugQ":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/version.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "BuRe");


function version(uuid) {
  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

/* harmony default export */ __webpack_exports__["default"] = (version);

/***/ }),

/***/ "h2TT":
/*!*************************************************************!*\
  !*** ./src/app/main/settings/manage-app/manage-app.page.ts ***!
  \*************************************************************/
/*! exports provided: ManageAppPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageAppPage", function() { return ManageAppPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_manage_app_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./manage-app.page.html */ "cUJx");
/* harmony import */ var _manage_app_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage-app.page.scss */ "nca4");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "4USb");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../services/settings.service */ "6nr9");
/* harmony import */ var _services_toaster_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../services/toaster.service */ "Ymxs");
/* harmony import */ var _modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modals/confirm-delete/confirm-delete.component */ "OVtC");







// services



let ManageAppPage = class ManageAppPage {
    constructor(settingsService, toasterService, actionSheetController, popoverController, router) {
        this.settingsService = settingsService;
        this.toasterService = toasterService;
        this.actionSheetController = actionSheetController;
        this.popoverController = popoverController;
        this.router = router;
        this.groupError = '';
        this.categoryError = '';
        this.expenseError = '';
    }
    ngOnInit() {
        this.addGroupForm = false;
        this.addCategoryForm = false;
        this.addExpenseForm = false;
        this.settings = this.settingsService.settings;
        if (this.settings) {
            const userData = this.settings;
            this.currentGroup = userData.currentGroup;
            if (userData.groups && userData.groups.length > 0) {
                this.groups = userData.groups;
            }
            else {
                this.groups = [];
            }
            if (userData.categories && userData.categories.length > 0) {
                this.categories = userData.categories;
            }
            else {
                this.categories = [];
            }
            if (userData.expenses && userData.expenses.length > 0) {
                this.expenses = userData.expenses;
            }
            else {
                this.expenses = [];
            }
        }
        else {
            this.groups = [];
            this.categories = [];
            this.expenses = [];
        }
    }
    addCategory(form) {
        const categoryName = form.value.category.toLowerCase().trim();
        const index = this.categories.findIndex((catg) => {
            if (this.getKeyVal(catg).value.toLowerCase() === categoryName) {
                return true;
            }
        });
        if (index !== -1) {
            return;
        }
        const cid = uuid__WEBPACK_IMPORTED_MODULE_6__["v4"]();
        const category = {
            [cid]: categoryName
        };
        this.categories.push(category);
        this.settingsService.updateCategories(this.categories).subscribe(() => {
            form.reset();
            this.updateSettings('categories', this.categories);
            this.toasterService.presentToast('Success!!', 'Category was added successfully', 500);
            this.addCategoryForm = false;
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        });
    }
    editCategory(form) {
        const category = form.value.category.trim().toLowerCase();
        if (this.selectedCategory.category === category) {
            form.reset();
            this.selectedCategory = null;
            this.addCategoryForm = false;
            return;
        }
        const index = this.categories.findIndex((catg) => {
            if (catg[this.selectedCategory.cid] === this.selectedCategory.category) {
                return true;
            }
        });
        this.categories[index][this.selectedCategory.cid] = category;
        this.settingsService.updateCategories(this.categories).subscribe(() => {
            form.reset();
            this.updateSettings('categories', this.categories);
            this.toasterService.presentToast('Success!!', 'Category was editted successfully', 500);
            this.selectedCategory = null;
            this.addCategoryForm = false;
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        });
    }
    setCurrentGroup(groupId) {
        this.settingsService.updateCurrentGroup(groupId).subscribe(() => {
            this.updateSettings('currentGroup', groupId);
            if (this.groups.length === 1) {
                this.currentGroup = groupId;
            }
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        });
    }
    addGroup(form) {
        const groupName = form.value.group.toLowerCase().trim();
        if (this.groups.length === 3) {
            return;
        }
        const index = this.groups.findIndex((grp) => {
            if (this.getKeyVal(grp).value.toLowerCase() === groupName) {
                return true;
            }
        });
        if (index !== -1) {
            return;
        }
        const gid = uuid__WEBPACK_IMPORTED_MODULE_6__["v4"]();
        const group = {
            [gid]: groupName
        };
        this.groups.push(group);
        this.settingsService.updateGroup(this.groups).subscribe(() => {
            form.reset();
            this.updateSettings('groups', this.groups);
            this.toasterService.presentToast('Success!!', 'Group was added successfully', 500);
            this.addGroupForm = false;
            if (this.groups.length === 1) {
                const cgid = Object.keys(this.groups[0]).toString();
                this.setCurrentGroup(cgid);
            }
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        });
    }
    editGroup(form) {
        const group = form.value.group.toLowerCase().trim();
        if (this.selectedGroup.group === group) {
            form.reset();
            this.selectedGroup = null;
            this.addGroupForm = false;
            return;
        }
        const index = this.groups.findIndex((grp) => {
            if (grp[this.selectedGroup.gid] === this.selectedGroup.group) {
                return true;
            }
        });
        this.groups[index][this.selectedGroup.gid] = group;
        this.settingsService.updateGroup(this.groups).subscribe(() => {
            form.reset();
            this.updateSettings('groups', this.groups);
            this.toasterService.presentToast('Success!!', 'Group was editted successfully', 2000);
            this.selectedGroup = null;
            this.addGroupForm = false;
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        });
    }
    addExpense(form) {
        const expenseName = form.value.expense.toLowerCase().trim();
        const index = this.expenses.findIndex((exp) => {
            if (this.getKeyVal(exp).value.toLowerCase() === expenseName) {
                return true;
            }
        });
        if (index !== -1) {
            return;
        }
        const eid = uuid__WEBPACK_IMPORTED_MODULE_6__["v4"]();
        const expense = {
            [eid]: expenseName
        };
        this.expenses.push(expense);
        this.settingsService.updateExpenses(this.expenses).subscribe(() => {
            form.reset();
            this.updateSettings('expenses', this.expenses);
            this.toasterService.presentToast('Success!!', 'Expense was added successfully', 500);
            this.addExpenseForm = false;
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        });
    }
    editExpense(form) {
        const expenseName = form.value.expense.toLowerCase().trim();
        if (this.selectedExpense.expense === expenseName) {
            form.reset();
            this.selectedExpense = null;
            this.addExpenseForm = false;
            return;
        }
        const index = this.expenses.findIndex((exp) => {
            if (exp[this.selectedExpense.eid] === this.selectedExpense.expense) {
                return true;
            }
        });
        this.expenses[index][this.selectedExpense.eid] = expenseName;
        this.settingsService.updateExpenses(this.expenses).subscribe(() => {
            form.reset();
            this.updateSettings('expenses', this.expenses);
            this.toasterService.presentToast('Success!!', 'Expense was editted successfully', 2000);
            this.selectedExpense = null;
            this.addExpenseForm = false;
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        });
    }
    updateGetProductView(viewValue) {
        this.settingsService.updateGetProductsView(viewValue).subscribe(() => {
            this.updateSettings('getProductsView', viewValue);
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        });
    }
    presentGroupActionSheet(group, gid) {
        this.actionSheetController.create({
            header: 'Options',
            buttons: [{
                    text: 'Close',
                    icon: 'close-outline',
                    role: 'destructive'
                }, {
                    text: 'Edit',
                    icon: 'create-outline',
                    handler: () => {
                        this.addGroupForm = true;
                        this.selectedGroup = {
                            group,
                            gid
                        };
                    }
                },
            ]
        }).then((actionEl) => {
            actionEl.present();
        });
    }
    presentCategoryActionSheet(category, cid) {
        this.actionSheetController.create({
            header: 'Options',
            buttons: [{
                    text: 'Close',
                    icon: 'close-outline',
                    role: 'destructive'
                }, {
                    text: 'Products',
                    icon: 'prism-outline',
                    handler: () => {
                        this.router.navigate(['/', 'app', 'settings', 'manage-app', 'category', category, cid]);
                    }
                }, {
                    text: 'Edit',
                    icon: 'create-outline',
                    handler: () => {
                        this.addCategoryForm = true;
                        this.selectedCategory = {
                            category,
                            cid
                        };
                    }
                }, {
                    text: 'Delete',
                    icon: 'trash-outline',
                    handler: () => {
                        this.popoverController.create({
                            component: _modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_9__["ConfirmDeleteComponent"],
                            componentProps: {
                                type: 'Category',
                                message: 'Are data related to this category will be deleted. Proceed?'
                            }
                        }).then(popoverEl => {
                            popoverEl.present();
                            return popoverEl.onDidDismiss();
                        }).then(popoverResult => {
                            if (popoverResult.role === 'delete') {
                                const catgArr = this.categories.filter((catg) => {
                                    if (catg[cid] !== category) {
                                        return true;
                                    }
                                });
                                this.settingsService.updateCategories(catgArr, cid).subscribe((result) => {
                                    this.toasterService.presentToast('Success!!', 'Category was deleted successfully', 2000);
                                    this.categories = result.categories;
                                    this.updateSettings('categories', this.categories);
                                }, (error) => {
                                    this.toasterService.presentToast('Failure!!', error, 500, 'danger');
                                });
                            }
                        });
                    }
                }]
        }).then((actionEl) => {
            actionEl.present();
        });
    }
    presentExpenseActionSheet(expense, eid) {
        this.actionSheetController.create({
            header: 'Options',
            buttons: [{
                    text: 'Close',
                    icon: 'close-outline',
                    role: 'destructive'
                }, {
                    text: 'Edit',
                    icon: 'create-outline',
                    handler: () => {
                        this.addExpenseForm = true;
                        this.selectedExpense = {
                            expense,
                            eid
                        };
                    }
                }, {
                    text: 'Delete',
                    icon: 'trash-outline',
                    handler: () => {
                        this.popoverController.create({
                            component: _modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_9__["ConfirmDeleteComponent"],
                            componentProps: {
                                type: 'Category',
                                message: 'All data related to this category will be deleted. Proceed?'
                            }
                        }).then(popoverEl => {
                            popoverEl.present();
                            return popoverEl.onDidDismiss();
                        }).then(popoverResult => {
                            if (popoverResult.role === 'delete') {
                                const expArr = this.expenses.filter((exp) => {
                                    if (exp[eid] !== expense) {
                                        return true;
                                    }
                                });
                                this.settingsService.updateExpenses(expArr, eid).subscribe((result) => {
                                    this.toasterService.presentToast('Success!!', 'Category was deleted successfully', 2000);
                                    this.expenses = result.expenses;
                                    this.updateSettings('expenses', this.categories);
                                }, (error) => {
                                    this.toasterService.presentToast('Failure!!', error, 500, 'danger');
                                });
                            }
                        });
                    }
                }]
        }).then((actionEl) => {
            actionEl.present();
        });
    }
    // Utility functions
    getKeyVal(data) {
        const value = Object.keys(data).map(key => {
            return {
                key,
                value: data[key]
            };
        });
        return value[0];
    }
    updateSettings(type, data) {
        this.settings[type] = data;
        this.settingsService.settings = this.settings;
    }
};
ManageAppPage.ctorParameters = () => [
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_7__["SettingsService"] },
    { type: _services_toaster_service__WEBPACK_IMPORTED_MODULE_8__["ToasterService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
ManageAppPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-manage-app',
        template: _raw_loader_manage_app_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_manage_app_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ManageAppPage);



/***/ }),

/***/ "nca4":
/*!***************************************************************!*\
  !*** ./src/app/main/settings/manage-app/manage-app.page.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".title-center {\n  padding-left: 70px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcbWFuYWdlLWFwcC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtBQUNGIiwiZmlsZSI6Im1hbmFnZS1hcHAucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRpdGxlLWNlbnRlcntcclxuICBwYWRkaW5nLWxlZnQ6IDcwcHg7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "t133":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "tysn":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "xQqG":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "2Pgj");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "WM9j");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ })

}]);
//# sourceMappingURL=manage-app-manage-app-module.js.map