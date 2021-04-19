(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "HOkw":
/*!*********************************************************!*\
  !*** ./src/app/main/settings/profile/profile.page.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "ItXW":
/*!*********************************************************!*\
  !*** ./src/app/main/settings/profile/profile.module.ts ***!
  \*********************************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile-routing.module */ "c8qr");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "qWW2");







let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _profile_routing_module__WEBPACK_IMPORTED_MODULE_5__["ProfilePageRoutingModule"]
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]]
    })
], ProfilePageModule);



/***/ }),

/***/ "VkCl":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/settings/profile/profile.page.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Profile</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <ion-grid>\n    <ion-row class=\"ion-justify-content-center\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\">\n\n        <ion-toolbar size=\"12\" class=\"ion-text-center ion-margin-top\" style=\"background-color: #1f1f1f;\">\n          <ion-title>Name</ion-title>\n          <ion-buttons slot=\"primary\">\n            <ion-button (click)=\"updateNameForm = !updateNameForm\">\n              <ion-icon name=\"create-outline\" *ngIf=\"!updateNameForm\"></ion-icon>\n              <ion-icon name=\"close\" *ngIf=\"updateNameForm\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n\n        <ion-row style=\"background-color: rgb(40, 41, 44);\" class=\"ion-justify-content-center\">\n          <ion-col size=\"12\" *ngIf=\"updateNameForm\">\n            <form #updateNameForm=\"ngForm\" (ngSubmit)=\"updateName(updateNameForm)\">\n              <ion-item lines=\"none\">\n                <ion-input name=\"name\" ngModel [placeholder]=\"userName\" required minlength=\"2\" maxlength=\"20\" required>\n                </ion-input>\n                <ion-button type=\"submit\" fill=\"clear\" color=\"dark\" [disabled]=\"updateNameForm.invalid\"\n                  [disabled]=\"updateNameForm.invalid\">\n                  Update\n                </ion-button>\n              </ion-item>\n            </form>\n          </ion-col>\n          <ion-col size=\"12\" *ngIf=\"!updateNameForm\">\n            <ion-item>\n              <ion-label>{{userName | titlecase}}</ion-label>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n\n        <ion-toolbar size=\"12\" class=\"ion-text-center ion-margin-top\" style=\"background-color: #1f1f1f;\">\n          <ion-title>Password</ion-title>\n          <ion-buttons slot=\"primary\">\n            <ion-button (click)=\"updatePasswordForm = !updatePasswordForm\">\n              <ion-icon name=\"create-outline\" *ngIf=\"!updatePasswordForm\"></ion-icon>\n              <ion-icon name=\"close\" *ngIf=\"updatePasswordForm\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n\n        <ion-row style=\"background-color: rgb(40, 41, 44);\" class=\"ion-justify-content-center\">\n          <ion-col size=\"12\" *ngIf=\"updatePasswordForm\" class=\"ion-text-center\">\n            <form [formGroup]=\"passwordResetForm\" (ngSubmit)=\"updatePassword(passwordResetForm)\">\n              <ion-item lines=\"none\">\n                <ion-label position=\"floating\">Old Password</ion-label>\n                <ion-input name=\"oldPassword\" type=\"password\" formControlName=\"oldPassword\" required minlength=\"6\"\n                  maxlength=\"12\" required>\n                </ion-input>\n              </ion-item>\n              <ion-item lines=\"none\">\n                <ion-label position=\"floating\">New Password\n                  <small style=\"color: #ff4961\"\n                    *ngIf=\"passwordResetForm.errors?.passwordNotChanged && passwordResetForm.get('newPassword').dirty\">\n                    (Same as old password)</small>\n                </ion-label>\n                <ion-input name=\"newPassword\" formControlName=\"newPassword\" type=\"password\" required minlength=\"6\"\n                  maxlength=\"12\" required>\n                </ion-input>\n              </ion-item>\n              <ion-item>\n                <ion-label position=\"floating\">Confirm Password\n                  <small style=\"color: #ff4961\"\n                    *ngIf=\"passwordResetForm.errors?.invalidPassword && passwordResetForm.get('confirmPassword').dirty\">\n                    (Passwords do not match)</small>\n                </ion-label>\n                <ion-input name=\"confirmPassword\" formControlName=\"confirmPassword\" type=\"password\" required\n                  minlength=\"6\" maxlength=\"12\" required>\n                </ion-input>\n              </ion-item>\n              <ion-item>\n                <ion-row class=\"ion-justify-content-center\" style=\"width: 100%;\">\n                  <ion-button type=\"submit\" fill=\"clear\" color=\"dark\" [disabled]=\"passwordResetForm.invalid\">\n                    Update\n                  </ion-button>\n                </ion-row>\n              </ion-item>\n            </form>\n          </ion-col>\n          <ion-col size=\"12\" *ngIf=\"!updatePasswordForm\">\n            <ion-item>\n              ******\n            </ion-item>\n          </ion-col>\n        </ion-row>\n\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "c8qr":
/*!*****************************************************************!*\
  !*** ./src/app/main/settings/profile/profile-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: ProfilePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageRoutingModule", function() { return ProfilePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile.page */ "qWW2");




const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_3__["ProfilePage"]
    }
];
let ProfilePageRoutingModule = class ProfilePageRoutingModule {
};
ProfilePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ProfilePageRoutingModule);



/***/ }),

/***/ "qWW2":
/*!*******************************************************!*\
  !*** ./src/app/main/settings/profile/profile.page.ts ***!
  \*******************************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_profile_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./profile.page.html */ "VkCl");
/* harmony import */ var _profile_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.page.scss */ "HOkw");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../services/auth.service */ "lGQG");
/* harmony import */ var _services_toaster_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../services/toaster.service */ "Ymxs");








const checkPasswordChanged = (control) => {
    const oldPassword = control.get('oldPassword');
    const newPassword = control.get('newPassword');
    if (oldPassword.value !== newPassword.value) {
        return null;
    }
    else {
        return {
            passwordNotChanged: true
        };
    }
};
const comparePassword = (control) => {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    let same = false;
    try {
        if (newPassword.value.length >= 6 && newPassword.value.length <= 12) {
            same = newPassword.value === confirmPassword.value;
        }
    }
    catch (error) { }
    if (same && control.get('confirmPassword').dirty) {
        return null;
    }
    else {
        return {
            invalidPassword: true,
        };
    }
};
let ProfilePage = class ProfilePage {
    constructor(fb, authService, toasterService) {
        this.fb = fb;
        this.authService = authService;
        this.toasterService = toasterService;
        this.updateNameForm = false;
        this.updatePasswordForm = false;
        this.passwordResetForm = this.fb.group({
            oldPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(12)]),
            newPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(12)]),
            confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(12)])
        }, {
            validators: [comparePassword, checkPasswordChanged]
        });
    }
    ngOnInit() { }
    ionViewDidEnter() {
        this.authService.getUserDetails().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe((user) => {
            this.userName = user.name;
        }, (error) => {
            this.profileError = error;
        });
    }
    updateName(form) {
        const name = form.value.name;
        this.authService.updateUserName(name).subscribe((user) => {
            this.userName = user.name;
            this.updateNameForm = false;
            form.reset();
            this.toasterService.presentToast("Success", user.message, 2000);
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        });
    }
    updatePassword(form) {
        const newPassword = form.value.newPassword.trim();
        const oldPassword = form.value.oldPassword.trim();
        this.authService.updateUserPassword(newPassword, oldPassword).subscribe((result) => {
            this.updatePasswordForm = false;
            form.reset();
            this.toasterService.presentToast("Success", result.message, 2000);
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        });
    }
};
ProfilePage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
    { type: _services_toaster_service__WEBPACK_IMPORTED_MODULE_7__["ToasterService"] }
];
ProfilePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-profile',
        template: _raw_loader_profile_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_profile_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProfilePage);



/***/ })

}]);
//# sourceMappingURL=profile-profile-module.js.map