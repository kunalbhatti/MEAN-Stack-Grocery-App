(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-app-category-category-module"],{

/***/ "4ObG":
/*!******************************************************************************!*\
  !*** ./src/app/main/settings/manage-app/category/category-routing.module.ts ***!
  \******************************************************************************/
/*! exports provided: CategoryRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryRoutingModule", function() { return CategoryRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _category_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category.page */ "lEph");




const routes = [{
        path: '',
        component: _category_page__WEBPACK_IMPORTED_MODULE_3__["CategoryPage"]
    }];
let CategoryRoutingModule = class CategoryRoutingModule {
};
CategoryRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], CategoryRoutingModule);



/***/ }),

/***/ "JpNi":
/*!**********************************************************************!*\
  !*** ./src/app/main/settings/manage-app/category/category.module.ts ***!
  \**********************************************************************/
/*! exports provided: CategoryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryModule", function() { return CategoryModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _category_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./category-routing.module */ "4ObG");
/* harmony import */ var _category_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./category.page */ "lEph");







let CategoryModule = class CategoryModule {
};
CategoryModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_category_page__WEBPACK_IMPORTED_MODULE_6__["CategoryPage"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _category_routing_module__WEBPACK_IMPORTED_MODULE_5__["CategoryRoutingModule"]],
    })
], CategoryModule);



/***/ }),

/***/ "JqjF":
/*!**********************************************************************!*\
  !*** ./src/app/main/settings/manage-app/category/category.page.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXRlZ29yeS5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "Zg7H":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/settings/manage-app/category/category.page.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>{{category | titlecase}}</ion-title>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [defaultHref]=\"['/', 'app', 'settings', 'manage-app']\"></ion-back-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row class=\"ion-justify-content-center\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" class=\"ion-text-center\">\n\n        <ion-toolbar size=\"12\" class=\"ion-text-center ion-margin-top\" style=\"background-color: #1f1f1f;\">\n          <ion-title>Products</ion-title>\n          <ion-buttons slot=\"primary\">\n            <ion-button (click)=\"presentProductModal()\">\n              <ion-icon name=\"add-outline\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n\n        <ion-list *ngIf=\"productError === '' && products?.length > 0\" style=\"background-color: rgb(40, 41, 44);\">\n          <ion-card *ngFor=\"let product of products\">\n            <ion-card-header>\n              <ion-card-title>\n                {{product?.name | titlecase}}\n              </ion-card-title>\n              <ion-card-subtitle>\n                {{product?.brand | titlecase}}\n              </ion-card-subtitle>\n            </ion-card-header>\n            <ion-card-content>\n              <ion-item *ngIf=\"product?.size\">Size: {{product?.size | titlecase}}</ion-item>\n              <ion-item *ngIf=\"product?.quantity\">Quantity: {{product?.quantity}} {{product?.unit}}</ion-item>\n              <ion-item *ngIf=\"product?.price\">Price: {{product?.price}}</ion-item>\n            </ion-card-content>\n            <ion-row class=\"ion-justify-content-center\">\n              <ion-button fill=\"clear\" color=\"dark\" (click)=\"presentProductActionSheet(product)\">\n                <ion-icon name=\"ellipsis-horizontal\"></ion-icon>\n              </ion-button>\n            </ion-row>\n          </ion-card>\n        </ion-list>\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" class=\"ion-padding\">\n          <ion-text *ngIf=\"productError === '' && products?.length === 0\">No Items Found</ion-text>\n          <ion-text *ngIf=\"productError !== ''\">{{productError}}</ion-text>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "lEph":
/*!********************************************************************!*\
  !*** ./src/app/main/settings/manage-app/category/category.page.ts ***!
  \********************************************************************/
/*! exports provided: CategoryPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPage", function() { return CategoryPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_category_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./category.page.html */ "Zg7H");
/* harmony import */ var _category_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category.page.scss */ "JqjF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _modals_create_product_create_product_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../modals/create-product/create-product.component */ "R+U0");
/* harmony import */ var _modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../modals/confirm-delete/confirm-delete.component */ "OVtC");
/* harmony import */ var _services_toaster_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../services/toaster.service */ "Ymxs");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../services/settings.service */ "6nr9");






// components


// services


let CategoryPage = class CategoryPage {
    constructor(modalController, actionSheetController, popoverController, toasterService, settingsService, route) {
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
        this.popoverController = popoverController;
        this.toasterService = toasterService;
        this.settingsService = settingsService;
        this.route = route;
    }
    ngOnInit() {
        this.addProductForm = false;
        this.productError = '';
        this.route.paramMap.subscribe((params) => {
            this.category = params.get('category');
            this.cid = params.get('cid');
            this.settingsService.getProducts(this.cid).subscribe((productsData) => {
                if (productsData) {
                    this.products = productsData;
                }
                else {
                    this.products = [];
                }
            }, (error) => {
                this.productError = error;
            });
        });
    }
    onDismiss() {
        this.modalController.dismiss(null, 'cancel');
    }
    presentProductActionSheet(product) {
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
                        this.presentProductModal(product);
                    }
                }, {
                    text: 'Delete',
                    icon: 'trash-outline',
                    handler: () => {
                        this.popoverController.create({
                            component: _modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_7__["ConfirmDeleteComponent"],
                            componentProps: {
                                type: 'Product',
                                message: 'Are data related to this product will be deleted. Proceed?'
                            }
                        }).then((popoverEl) => {
                            popoverEl.present();
                            return popoverEl.onDidDismiss();
                        }).then(popoverResult => {
                            if (popoverResult.role === 'delete') {
                                this.settingsService.deleteProduct(product._id).subscribe(() => {
                                    this.toasterService.presentToast('Success!!', 'Product was deleted successfully', 500);
                                    this.products = this.products.filter(prod => {
                                        if (prod._id !== product._id) {
                                            return true;
                                        }
                                    });
                                }, error => {
                                    this.productError = error;
                                });
                            }
                        });
                    }
                }]
        }).then((actionEl) => {
            actionEl.present();
        });
    }
    presentProductModal(product) {
        this.modalController.create({
            component: _modals_create_product_create_product_component__WEBPACK_IMPORTED_MODULE_6__["CreateProductComponent"],
            componentProps: {
                product,
                cid: this.cid
            }
        }).then((modalEl) => {
            modalEl.present();
            return modalEl.onDidDismiss();
        }).then(modalResult => {
            if (modalResult.role === 'create') {
                this.toasterService.presentToast('Success!!', 'Product was added successfully', 500);
                this.products.push(modalResult.data);
            }
            if (modalResult.role === 'edit') {
                this.toasterService.presentToast('Success!!', 'Product was editted successfully', 500);
                const index = this.products.findIndex((prod) => {
                    if (prod._id === product._id) {
                        return true;
                    }
                });
                this.products[index] = modalResult.data;
            }
        });
    }
};
CategoryPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] },
    { type: _services_toaster_service__WEBPACK_IMPORTED_MODULE_8__["ToasterService"] },
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
];
CategoryPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-category',
        template: _raw_loader_category_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_category_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CategoryPage);



/***/ })

}]);
//# sourceMappingURL=manage-app-category-category-module.js.map