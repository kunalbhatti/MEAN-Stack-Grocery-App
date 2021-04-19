(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-module"],{

/***/ "QXsw":
/*!**********************************************************!*\
  !*** ./src/app/main/settings/settings-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: SettingsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsRoutingModule", function() { return SettingsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.page */ "iLic");




const routes = [{
        path: '',
        component: _settings_page__WEBPACK_IMPORTED_MODULE_3__["SettingsPage"],
        children: [{
                path: 'manage-app',
                children: [{
                        path: '',
                        loadChildren: () => Promise.all(/*! import() | manage-app-manage-app-module */[__webpack_require__.e("common"), __webpack_require__.e("manage-app-manage-app-module")]).then(__webpack_require__.bind(null, /*! ./manage-app/manage-app.module */ "PPoh")).then(m => m.ManageAppPageModule)
                    },
                    {
                        path: 'category/:category/:cid',
                        loadChildren: () => Promise.all(/*! import() | manage-app-category-category-module */[__webpack_require__.e("common"), __webpack_require__.e("manage-app-category-category-module")]).then(__webpack_require__.bind(null, /*! ./manage-app/category/category.module */ "JpNi")).then(m => m.CategoryModule)
                    }
                ]
            }, {
                path: 'profile',
                loadChildren: () => Promise.all(/*! import() | profile-profile-module */[__webpack_require__.e("common"), __webpack_require__.e("profile-profile-module")]).then(__webpack_require__.bind(null, /*! ./profile/profile.module */ "ItXW")).then(m => m.ProfilePageModule)
            }, {
                path: '',
                redirectTo: 'manage-app',
                pathMatch: 'full'
            }]
    },];
let SettingsRoutingModule = class SettingsRoutingModule {
};
SettingsRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], SettingsRoutingModule);



/***/ }),

/***/ "ZZ99":
/*!**************************************************!*\
  !*** ./src/app/main/settings/settings.module.ts ***!
  \**************************************************/
/*! exports provided: SettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings-routing.module */ "QXsw");
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings.page */ "iLic");






let SettingsModule = class SettingsModule {
};
SettingsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_settings_page__WEBPACK_IMPORTED_MODULE_5__["SettingsPage"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _settings_routing_module__WEBPACK_IMPORTED_MODULE_4__["SettingsRoutingModule"]],
        exports: []
    })
], SettingsModule);



/***/ }),

/***/ "iLic":
/*!************************************************!*\
  !*** ./src/app/main/settings/settings.page.ts ***!
  \************************************************/
/*! exports provided: SettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPage", function() { return SettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_settings_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./settings.page.html */ "xpQr");
/* harmony import */ var _settings_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings.page.css */ "ix5s");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let SettingsPage = class SettingsPage {
    ngOnInit() {
    }
};
SettingsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-settings',
        template: _raw_loader_settings_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_settings_page_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SettingsPage);



/***/ }),

/***/ "ix5s":
/*!*************************************************!*\
  !*** ./src/app/main/settings/settings.page.css ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXR0aW5ncy5wYWdlLmNzcyJ9 */");

/***/ }),

/***/ "xpQr":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/settings/settings.page.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-router-outlet></ion-router-outlet>\n");

/***/ })

}]);
//# sourceMappingURL=settings-settings-module.js.map