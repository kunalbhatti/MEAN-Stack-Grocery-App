(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["register-register-module"],{

/***/ "9WYv":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/register/register.page.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Grocery App</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <ion-grid style=\"height: 100%;\">\n    <ion-row class=\"ion-justify-content-center\" style=\"height: 100%; align-content: center;\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" size-lg=\"6\" size-xl=\"4\" class=\"ion-no-padding\">\n        <ion-toolbar>\n          <ion-title class=\"ion-text-center ion-padding\" style=\"border-bottom: 1px solid;\">Register</ion-title>\n        </ion-toolbar>\n        <form (ngSubmit)=\"onSubmit()\" [formGroup]=\"registrationForm\">\n          <ion-item>\n            <ion-label position=\"floating\">Name</ion-label>\n            <ion-input formControlName=\"name\" type=\"text\" required minlength=\"3\" maxlength=\"20\"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label position=\"floating\">Email</ion-label>\n            <ion-input formControlName=\"email\" type=\"email\" email required></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label position=\"floating\">Password\n              <small style=\"color: #ffd534\" *ngIf=\"showPasswordHint\">\n                (6-12 characters long)\n              </small>\n            </ion-label>\n            <ion-input formControlName=\"password\" type=\"password\" required minlength=\"6\" maxlength=\"12\"\n              (ionFocus)=\"showPasswordHint = true\" (ionBlur)=\"showPasswordHint = false\"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label position=\"floating\">Confirm Password\n              <small style=\"color: #ff4961\"\n                *ngIf=\"registrationForm.errors?.invalidPassword && registrationForm.get('confirmPassword').dirty\">\n                (Passwords do not match)</small>\n            </ion-label>\n            <ion-input formControlName=\"confirmPassword\" type=\"password\" required minlength=\"6\" maxlength=\"12\">\n            </ion-input>\n          </ion-item>\n          <ion-button type=\"submit\" expand=\"full\"\n            [disabled]=\"registrationForm.invalid && registrationForm.errors?.invalidPassword\" class=\"ion-no-margin\">\n            Register</ion-button>\n        </form>\n        <div style=\"text-align: center; padding: 5px;\">\n        </div>\n      </ion-col>\n      <ion-col size=\"12\" class=\"ion-text-center\">\n        <ion-button fill=\"clear\" color=\"primary\" [routerLink]=\"['/', 'auth', 'login']\"><small>Login</small></ion-button>\n        <ion-button fill=\"clear\" color=\"primary\" [routerLink]=\"['/', 'auth', 'activate-account', 'null']\">\n          <small>Activation Code</small></ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "Ro0S":
/*!**********************************************************!*\
  !*** ./src/app/auth/register/register-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: RegisterRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterRoutingModule", function() { return RegisterRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register.page */ "yhyc");




const routes = [{
        path: '',
        component: _register_page__WEBPACK_IMPORTED_MODULE_3__["RegisterPage"]
    }];
let RegisterRoutingModule = class RegisterRoutingModule {
};
RegisterRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], RegisterRoutingModule);



/***/ }),

/***/ "UrDz":
/*!**************************************************!*\
  !*** ./src/app/auth/register/register.module.ts ***!
  \**************************************************/
/*! exports provided: RegisterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _register_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register-routing.module */ "Ro0S");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./register.page */ "yhyc");







let RegisterModule = class RegisterModule {
};
RegisterModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_register_page__WEBPACK_IMPORTED_MODULE_6__["RegisterPage"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _register_routing_module__WEBPACK_IMPORTED_MODULE_5__["RegisterRoutingModule"]]
    })
], RegisterModule);



/***/ }),

/***/ "izkA":
/*!*************************************************!*\
  !*** ./src/app/auth/register/register.page.css ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3Rlci5wYWdlLmNzcyJ9 */");

/***/ }),

/***/ "yhyc":
/*!************************************************!*\
  !*** ./src/app/auth/register/register.page.ts ***!
  \************************************************/
/*! exports provided: RegisterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPage", function() { return RegisterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_register_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./register.page.html */ "9WYv");
/* harmony import */ var _register_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.page.css */ "izkA");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_services_toaster_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/toaster.service */ "Ymxs");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../services/auth.service */ "lGQG");









const comparePassword = (control) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    let same = false;
    if (password.value.length >= 6 && password.value.length <= 12) {
        same = password.value === confirmPassword.value;
    }
    if (same && control.get('confirmPassword').dirty) {
        return null;
    }
    else {
        return {
            invalidPassword: true
        };
    }
};
let RegisterPage = class RegisterPage {
    constructor(fb, authService, alertController, router, toasterService) {
        this.fb = fb;
        this.authService = authService;
        this.alertController = alertController;
        this.router = router;
        this.toasterService = toasterService;
        this.registrationForm = this.fb.group({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(20)]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(12)]),
            confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(12)])
        }, {
            validators: [comparePassword]
        });
    }
    ngOnInit() {
        this.showPasswordHint = false;
    }
    onSubmit() {
        this.authService.register(this.registrationForm.value).subscribe(() => {
            this.authService.getActivationLink(this.registrationForm.value.email).subscribe(() => {
                this.alertController.create({
                    header: 'Success',
                    message: 'Activation link mailed to the email address. Please click on the link to activate the account',
                    buttons: [{
                            text: 'Ok',
                            handler: () => {
                                this.router.navigate(['/', 'auth', 'login']);
                            }
                        }]
                }).then((alertEl) => {
                    alertEl.present();
                });
            }, (error) => {
                this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
            });
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        });
    }
};
RegisterPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: src_app_services_toaster_service__WEBPACK_IMPORTED_MODULE_7__["ToasterService"] }
];
RegisterPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-register',
        template: _raw_loader_register_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_register_page_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], RegisterPage);



/***/ })

}]);
//# sourceMappingURL=register-register-module.js.map