(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["recover-password-recover-password-module"],{

/***/ "8iXH":
/*!**************************************************************************!*\
  !*** ./src/app/auth/recover-password/recover-password-routing.module.ts ***!
  \**************************************************************************/
/*! exports provided: RecoverPasswordPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecoverPasswordPageRoutingModule", function() { return RecoverPasswordPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _recover_password_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recover-password.page */ "oBf6");




const routes = [
    {
        path: '',
        component: _recover_password_page__WEBPACK_IMPORTED_MODULE_3__["RecoverPasswordPage"]
    }
];
let RecoverPasswordPageRoutingModule = class RecoverPasswordPageRoutingModule {
};
RecoverPasswordPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], RecoverPasswordPageRoutingModule);



/***/ }),

/***/ "hcU5":
/*!******************************************************************!*\
  !*** ./src/app/auth/recover-password/recover-password.page.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWNvdmVyLXBhc3N3b3JkLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "oBf6":
/*!****************************************************************!*\
  !*** ./src/app/auth/recover-password/recover-password.page.ts ***!
  \****************************************************************/
/*! exports provided: RecoverPasswordPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecoverPasswordPage", function() { return RecoverPasswordPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_recover_password_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./recover-password.page.html */ "oZph");
/* harmony import */ var _recover_password_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recover-password.page.scss */ "hcU5");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");





let RecoverPasswordPage = class RecoverPasswordPage {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() { }
    recoverPassword(form) {
        this.authService.recoverPassword(form.value.email).subscribe((result) => {
            console.log(result);
        });
    }
};
RecoverPasswordPage.ctorParameters = () => [
    { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] }
];
RecoverPasswordPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-recover-password',
        template: _raw_loader_recover_password_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_recover_password_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], RecoverPasswordPage);



/***/ }),

/***/ "oZph":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/recover-password/recover-password.page.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Grocery App</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <ion-grid style=\"height: 100%;\">\n    <ion-row class=\"ion-justify-content-center\" style=\"height: 100%; align-content: center;\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" size-lg=\"6\" size-xl=\"4\" class=\"ion-no-padding\">\n        <ion-toolbar>\n          <ion-title class=\"ion-text-center ion-padding\" style=\"border-bottom: 1px solid;\">Password Recovery</ion-title>\n        </ion-toolbar>\n        <form (ngSubmit)=\"recoverPassword(recoveryForm)\" #recoveryForm=\"ngForm\">\n          <ion-item>\n            <ion-label position=\"floating\">Registered Email</ion-label>\n            <ion-input type=\"email\" name=\"email\" ngModel required></ion-input>\n          </ion-item>\n          <ion-button type=\"submit\" expand=\"full\" [disabled]=\"recoveryForm.invalid\" class=\"ion-no-margin\">\n            Recover</ion-button>\n        </form>\n      </ion-col>\n      <ion-col size=\"12\" class=\"ion-text-center\">\n        <ion-button fill=\"clear\" color=\"primary\" [routerLink]=\"['/', 'auth', 'login']\"><small>Login</small>\n        </ion-button>\n        <ion-button fill=\"clear\" color=\"primary\" [routerLink]=\"['/', 'auth', 'register']\"><small>Register</small>\n        </ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "z/3Y":
/*!******************************************************************!*\
  !*** ./src/app/auth/recover-password/recover-password.module.ts ***!
  \******************************************************************/
/*! exports provided: RecoverPasswordPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecoverPasswordPageModule", function() { return RecoverPasswordPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _recover_password_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recover-password-routing.module */ "8iXH");
/* harmony import */ var _recover_password_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recover-password.page */ "oBf6");







let RecoverPasswordPageModule = class RecoverPasswordPageModule {
};
RecoverPasswordPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _recover_password_routing_module__WEBPACK_IMPORTED_MODULE_5__["RecoverPasswordPageRoutingModule"]
        ],
        declarations: [_recover_password_page__WEBPACK_IMPORTED_MODULE_6__["RecoverPasswordPage"]]
    })
], RecoverPasswordPageModule);



/***/ })

}]);
//# sourceMappingURL=recover-password-recover-password-module.js.map