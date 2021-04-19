(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["activate-account-activate-account-module"],{

/***/ "4Ji8":
/*!******************************************************************!*\
  !*** ./src/app/auth/activate-account/activate-account.page.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhY3RpdmF0ZS1hY2NvdW50LnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "6TNa":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/activate-account/activate-account.page.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Grocery App</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <ion-grid style=\"height: 100%;\">\n    <ion-row class=\"ion-justify-content-center\" style=\"height: 100%; align-content: center;\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" size-lg=\"6\" size-xl=\"4\" class=\"ion-no-padding\">\n        <ion-toolbar>\n          <ion-title class=\"ion-text-center ion-padding\" style=\"border-bottom: 1px solid;\">Activate Account</ion-title>\n        </ion-toolbar>\n        <form (ngSubmit)=\"getActvationLink(activationForm)\" #activationForm=\"ngForm\">\n          <ion-item>\n            <ion-label position=\"floating\">Registered Email</ion-label>\n            <ion-input [ngModel]=\"email\" type=\"email\" name=\"email\" ngModel required></ion-input>\n          </ion-item>\n          <ion-button type=\"submit\" expand=\"full\" [disabled]=\"activationForm.invalid\" class=\"ion-no-margin\">\n            Get Link</ion-button>\n        </form>\n      </ion-col>\n      <ion-col size=\"12\" class=\"ion-text-center\">\n        <ion-button fill=\"clear\" color=\"primary\" [routerLink]=\"['/', 'auth', 'login']\"><small>Login</small>\n        </ion-button>\n        <ion-button fill=\"clear\" color=\"primary\" [routerLink]=\"['/', 'auth', 'register']\"><small>Register</small>\n        </ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "THV4":
/*!**************************************************************************!*\
  !*** ./src/app/auth/activate-account/activate-account-routing.module.ts ***!
  \**************************************************************************/
/*! exports provided: ActivateAccountPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivateAccountPageRoutingModule", function() { return ActivateAccountPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _activate_account_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activate-account.page */ "WiHb");




const routes = [
    {
        path: '',
        component: _activate_account_page__WEBPACK_IMPORTED_MODULE_3__["ActivateAccountPage"]
    }
];
let ActivateAccountPageRoutingModule = class ActivateAccountPageRoutingModule {
};
ActivateAccountPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ActivateAccountPageRoutingModule);



/***/ }),

/***/ "WiHb":
/*!****************************************************************!*\
  !*** ./src/app/auth/activate-account/activate-account.page.ts ***!
  \****************************************************************/
/*! exports provided: ActivateAccountPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivateAccountPage", function() { return ActivateAccountPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_activate_account_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./activate-account.page.html */ "6TNa");
/* harmony import */ var _activate_account_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activate-account.page.scss */ "4Ji8");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_services_toaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/toaster.service */ "Ymxs");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../services/auth.service */ "lGQG");








let ActivateAccountPage = class ActivateAccountPage {
    constructor(authService, router, route, alertController, toasterService) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.alertController = alertController;
        this.toasterService = toasterService;
    }
    ngOnInit() { }
    ionViewDidEnter() {
        this.route.params.subscribe(params => {
            this.email = params.email;
            if (this.email === 'null') {
                this.email = '';
            }
        });
    }
    getActvationLink(form) {
        this.authService.getActivationLink(form.value.email).subscribe(() => {
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
    }
};
ActivateAccountPage.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: src_app_services_toaster_service__WEBPACK_IMPORTED_MODULE_6__["ToasterService"] }
];
ActivateAccountPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-activate-account',
        template: _raw_loader_activate_account_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_activate_account_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ActivateAccountPage);



/***/ }),

/***/ "cZJw":
/*!******************************************************************!*\
  !*** ./src/app/auth/activate-account/activate-account.module.ts ***!
  \******************************************************************/
/*! exports provided: ActivateAccountPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivateAccountPageModule", function() { return ActivateAccountPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _activate_account_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activate-account-routing.module */ "THV4");
/* harmony import */ var _activate_account_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./activate-account.page */ "WiHb");







let ActivateAccountPageModule = class ActivateAccountPageModule {
};
ActivateAccountPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _activate_account_routing_module__WEBPACK_IMPORTED_MODULE_5__["ActivateAccountPageRoutingModule"]
        ],
        declarations: [_activate_account_page__WEBPACK_IMPORTED_MODULE_6__["ActivateAccountPage"]]
    })
], ActivateAccountPageModule);



/***/ })

}]);
//# sourceMappingURL=activate-account-activate-account-module.js.map