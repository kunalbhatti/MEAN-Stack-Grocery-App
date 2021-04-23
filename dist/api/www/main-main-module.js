(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-main-module"],{

/***/ "/UQe":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/main.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-tabs>\n  <ion-tab-bar slot=\"bottom\">\n    <ion-tab-button tab=\"inventory\">\n      <ion-icon name=\"home-outline\"></ion-icon>\n      <ion-label>Inventory</ion-label>\n    </ion-tab-button>\n    <ion-tab-button tab=\"cart\">\n      <ion-icon name=\"cart-outline\"></ion-icon>\n      <ion-label>Cart</ion-label>\n    </ion-tab-button>\n    <ion-tab-button tab=\"expenses\">\n      <ion-icon name=\"card-outline\"></ion-icon>\n      <ion-label>Expenses</ion-label>\n    </ion-tab-button>\n    <ion-tab-button tab=\"settings\">\n      <ion-icon name=\"settings-outline\"></ion-icon>\n      <ion-label>Settings</ion-label>\n    </ion-tab-button>\n  </ion-tab-bar>\n</ion-tabs>\n");

/***/ }),

/***/ "0t2f":
/*!************************************!*\
  !*** ./src/app/main/main.page.css ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWluLnBhZ2UuY3NzIn0= */");

/***/ }),

/***/ "3hl/":
/*!*********************************************!*\
  !*** ./src/app/main/main-routing.module.ts ***!
  \*********************************************/
/*! exports provided: MainRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainRoutingModule", function() { return MainRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _main_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main.page */ "Rmbw");




const routes = [{
        path: '',
        component: _main_page__WEBPACK_IMPORTED_MODULE_3__["MainPage"],
        children: [{
                path: 'cart',
                loadChildren: () => Promise.all(/*! import() | cart-cart-module */[__webpack_require__.e("common"), __webpack_require__.e("cart-cart-module")]).then(__webpack_require__.bind(null, /*! ./cart/cart.module */ "POM6")).then(m => m.CartModule)
            }, {
                path: 'expenses',
                loadChildren: () => Promise.all(/*! import() | expenses-expenses-module */[__webpack_require__.e("common"), __webpack_require__.e("expenses-expenses-module")]).then(__webpack_require__.bind(null, /*! ./expenses/expenses.module */ "K9ex")).then(m => m.ExpensesModule)
            }, {
                path: 'inventory',
                loadChildren: () => Promise.all(/*! import() | inventory-inventory-module */[__webpack_require__.e("common"), __webpack_require__.e("inventory-inventory-module")]).then(__webpack_require__.bind(null, /*! ./inventory/inventory.module */ "VzXA")).then(m => m.InventoryModule)
            }, {
                path: 'settings',
                children: [{
                        path: '',
                        loadChildren: () => __webpack_require__.e(/*! import() | settings-settings-module */ "settings-settings-module").then(__webpack_require__.bind(null, /*! ./settings/settings.module */ "ZZ99")).then(m => m.SettingsModule)
                    }]
            }, {
                path: '',
                redirectTo: 'inventory',
                pathMatch: 'full'
            }],
    }];
let MainRoutingModule = class MainRoutingModule {
};
MainRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], MainRoutingModule);



/***/ }),

/***/ "43od":
/*!***************************************************************************!*\
  !*** ./src/app/main/cart/modals/sort-products/sort-products.component.ts ***!
  \***************************************************************************/
/*! exports provided: SortProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortProductsComponent", function() { return SortProductsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_sort_products_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./sort-products.component.html */ "7UiJ");
/* harmony import */ var _sort_products_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sort-products.component.scss */ "4m3d");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let SortProductsComponent = class SortProductsComponent {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    ngOnInit() {
    }
    onDismiss() {
        this.popoverController.dismiss(null, 'cancel');
    }
    onSubmit(form) {
        this.popoverController.dismiss(form.value.selectedView, 'filter');
    }
};
SortProductsComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] }
];
SortProductsComponent.propDecorators = {
    sortBy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
SortProductsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-sort-products',
        template: _raw_loader_sort_products_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_sort_products_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SortProductsComponent);



/***/ }),

/***/ "4m3d":
/*!*****************************************************************************!*\
  !*** ./src/app/main/cart/modals/sort-products/sort-products.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzb3J0LXByb2R1Y3RzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "7UiJ":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/cart/modals/sort-products/sort-products.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar class=\"ion-text-center\">\n    <ion-title>Sort Products:</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form #sortExpenseForm=\"ngForm\" (ngSubmit)=\"onSubmit(sortExpenseForm)\">\n    <ion-list>\n      <ion-radio-group name=\"selectedView\" [ngModel]=\"sortBy\">\n        <ion-item>\n          <ion-label>None</ion-label>\n          <ion-radio value=\"none\"></ion-radio>\n        </ion-item>\n        <ion-item>\n          <ion-label>Price</ion-label>\n          <ion-radio value=\"price\"></ion-radio>\n        </ion-item>\n        <ion-item>\n          <ion-label>Units</ion-label>\n          <ion-radio value=\"units\"></ion-radio>\n        </ion-item>\n\n      </ion-radio-group>\n    </ion-list>\n    <ion-item>\n      <ion-row class=\"ion-text-center\" style=\"display:flex; flex-flow: row\">\n        <ion-button fill=\"clear\" (click)=\"onDismiss()\">Cancel</ion-button>\n        <ion-button type=\"submit\" fill=\"clear\" [disabled]=\"sortExpenseForm.invalid\">\n          Apply Filter\n        </ion-button>\n      </ion-row>\n    </ion-item>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "GnF7":
/*!*******************************************************************************!*\
  !*** ./src/app/main/expenses/modals/expense-view/expense-view.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJleHBlbnNlLXZpZXcuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "Miu9":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/expenses/modals/expense-view/expense-view.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar class=\"ion-text-center\">\n    <ion-title>Expense View:</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form #sortExpenseForm=\"ngForm\" (ngSubmit)=\"onSubmit(sortExpenseForm)\">\n    <ion-list>\n      <ion-radio-group name=\"selectedView\" [ngModel]=\"selectedView\">\n        <ion-item>\n          <ion-label>Monthly</ion-label>\n          <ion-radio value=\"monthly\"></ion-radio>\n        </ion-item>\n        <ion-item>\n          <ion-label>Yearly</ion-label>\n          <ion-radio value=\"yearly\"></ion-radio>\n        </ion-item>\n\n      </ion-radio-group>\n    </ion-list>\n    <ion-item>\n      <ion-row class=\"ion-text-center\" style=\"display:flex; flex-flow: row\">\n        <ion-button fill=\"clear\" (click)=\"onDismiss()\">Cancel</ion-button>\n        <ion-button type=\"submit\" fill=\"clear\" [disabled]=\"sortExpenseForm.invalid\">\n          Apply Filter\n        </ion-button>\n      </ion-row>\n    </ion-item>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "O8PA":
/*!*******************************************************************************!*\
  !*** ./src/app/main/cart/modals/filter-products/filter-products.component.ts ***!
  \*******************************************************************************/
/*! exports provided: FilterProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterProductsComponent", function() { return FilterProductsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_filter_products_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./filter-products.component.html */ "uLEl");
/* harmony import */ var _filter_products_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter-products.component.scss */ "VLBR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let FilterProductsComponent = class FilterProductsComponent {
    constructor(popoverController) {
        this.popoverController = popoverController;
        this.categories = [];
        this.categoryKeys = [];
    }
    ngOnInit() {
        this.categories.forEach(category => {
            this.categoryKeys.push(Object.keys(category).toString());
        });
    }
    onDismiss() {
        this.popoverController.dismiss(null, 'cancel');
    }
    onSubmit(form) {
        for (let category of this.categories) {
            if (category[form.value.category]) {
                this.popoverController.dismiss({ id: form.value.category, name: category[form.value.category] }, 'filter');
            }
        }
    }
};
FilterProductsComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] }
];
FilterProductsComponent.propDecorators = {
    categories: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    selectedCategory: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
FilterProductsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-filter-products',
        template: _raw_loader_filter_products_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_filter_products_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], FilterProductsComponent);



/***/ }),

/***/ "Rmbw":
/*!***********************************!*\
  !*** ./src/app/main/main.page.ts ***!
  \***********************************/
/*! exports provided: MainPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainPage", function() { return MainPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_main_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./main.page.html */ "/UQe");
/* harmony import */ var _main_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.page.css */ "0t2f");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/settings.service */ "6nr9");






let MainPage = class MainPage {
    constructor(route, settingsService) {
        this.route = route;
        this.settingsService = settingsService;
    }
    ngOnInit() {
        this.settingsService.settings = this.route.snapshot.data['data']['settings'];
    }
};
MainPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_5__["SettingsService"] }
];
MainPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-main',
        template: _raw_loader_main_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_main_page_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], MainPage);



/***/ }),

/***/ "UOz5":
/*!***********************************************************************************!*\
  !*** ./src/app/main/cart/modals/add-to-inventory/add-to-inventory.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtdG8taW52ZW50b3J5LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "VLBR":
/*!*********************************************************************************!*\
  !*** ./src/app/main/cart/modals/filter-products/filter-products.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmaWx0ZXItcHJvZHVjdHMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "XpXM":
/*!*************************************!*\
  !*** ./src/app/main/main.module.ts ***!
  \*************************************/
/*! exports provided: MainModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainModule", function() { return MainModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _main_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main.page */ "Rmbw");
/* harmony import */ var _cart_modals_add_to_inventory_add_to_inventory_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/modals/add-to-inventory/add-to-inventory.component */ "kMKV");
/* harmony import */ var _expenses_modals_expense_view_expense_view_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./expenses/modals/expense-view/expense-view.component */ "dIqv");
/* harmony import */ var _cart_modals_filter_products_filter_products_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cart/modals/filter-products/filter-products.component */ "O8PA");
/* harmony import */ var _cart_modals_sort_products_sort_products_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cart/modals/sort-products/sort-products.component */ "43od");
/* harmony import */ var _main_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./main-routing.module */ "3hl/");











let MainModule = class MainModule {
};
MainModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_main_page__WEBPACK_IMPORTED_MODULE_5__["MainPage"], _cart_modals_add_to_inventory_add_to_inventory_component__WEBPACK_IMPORTED_MODULE_6__["AddToInventoryComponent"], _cart_modals_filter_products_filter_products_component__WEBPACK_IMPORTED_MODULE_8__["FilterProductsComponent"], _cart_modals_sort_products_sort_products_component__WEBPACK_IMPORTED_MODULE_9__["SortProductsComponent"], _expenses_modals_expense_view_expense_view_component__WEBPACK_IMPORTED_MODULE_7__["ExpenseViewComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _main_routing_module__WEBPACK_IMPORTED_MODULE_10__["MainRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]],
    })
], MainModule);



/***/ }),

/***/ "dIqv":
/*!*****************************************************************************!*\
  !*** ./src/app/main/expenses/modals/expense-view/expense-view.component.ts ***!
  \*****************************************************************************/
/*! exports provided: ExpenseViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpenseViewComponent", function() { return ExpenseViewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_expense_view_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./expense-view.component.html */ "Miu9");
/* harmony import */ var _expense_view_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expense-view.component.scss */ "GnF7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let ExpenseViewComponent = class ExpenseViewComponent {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    ngOnInit() {
    }
    onDismiss() {
        this.popoverController.dismiss(null, 'cancel');
    }
    onSubmit(form) {
        this.popoverController.dismiss(form.value.selectedView, 'filter');
    }
};
ExpenseViewComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] }
];
ExpenseViewComponent.propDecorators = {
    selectedView: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
ExpenseViewComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-expense-view',
        template: _raw_loader_expense_view_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_expense_view_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ExpenseViewComponent);



/***/ }),

/***/ "kMKV":
/*!*********************************************************************************!*\
  !*** ./src/app/main/cart/modals/add-to-inventory/add-to-inventory.component.ts ***!
  \*********************************************************************************/
/*! exports provided: AddToInventoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddToInventoryComponent", function() { return AddToInventoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_add_to_inventory_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./add-to-inventory.component.html */ "x9RS");
/* harmony import */ var _add_to_inventory_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-to-inventory.component.scss */ "UOz5");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let AddToInventoryComponent = class AddToInventoryComponent {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    ngOnInit() { }
    onDismiss() {
        this.popoverController.dismiss(null, 'cancel');
    }
    onSubmit(form) {
        this.popoverController.dismiss(form.value, 'create');
    }
};
AddToInventoryComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] }
];
AddToInventoryComponent.propDecorators = {
    product: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    gid: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
AddToInventoryComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-add-to-inventory',
        template: _raw_loader_add_to_inventory_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_add_to_inventory_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AddToInventoryComponent);



/***/ }),

/***/ "uLEl":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/cart/modals/filter-products/filter-products.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar class=\"ion-text-center\">\n    <ion-title>Filter By:</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form #filterCategoryForm=\"ngForm\" (ngSubmit)=\"onSubmit(filterCategoryForm)\">\n    <ion-list>\n      <ion-radio-group name=\"category\" [ngModel]=\"selectedCategory\">\n        <ion-item *ngFor=\"let category of categories; let i = index;\">\n          <ion-label> {{category[categoryKeys[i]] | titlecase}}</ion-label>\n          <ion-radio [value]=\"categoryKeys[i]\"></ion-radio>\n        </ion-item>\n      </ion-radio-group>\n    </ion-list>\n    <ion-item>\n      <ion-row class=\"ion-text-center\" style=\"display:flex; flex-flow: row\">\n        <ion-button fill=\"clear\" (click)=\"onDismiss()\">Cancel</ion-button>\n        <ion-button type=\"submit\" fill=\"clear\" [disabled]=\"filterCategoryForm.invalid\">\n          Apply Filter\n        </ion-button>\n      </ion-row>\n    </ion-item>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "x9RS":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/cart/modals/add-to-inventory/add-to-inventory.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar class=\"ion-text-center\">\n    <ion-title>Add To Inventory</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-no-padding\">\n\n  <form #addToInventoryForm=\"ngForm\" (ngSubmit)=\"onSubmit(addToInventoryForm)\">\n    <ion-item>\n      <ion-label position=\"floating\">Name</ion-label>\n      <ion-input disabled [value]=\"product?.name | titlecase\"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Brand</ion-label>\n      <ion-input disabled [value]=\"product?.brand | titlecase\"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Units</ion-label>\n      <ion-input type=\"number\" [ngModel]=\"product?.cart[gid]\" name=\"units\" min=\"1\" #cart></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Total Cost <small>(Required)</small></ion-label>\n      <ion-input type=\"number\" [ngModel]=\"(+product?.price/ +product?.quantity) * +cart.value\" name=\"cost\" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-row class=\"ion-text-center\" style=\"display:flex; flex-flow: row\">\n        <ion-button fill=\"clear\" (click)=\"onDismiss()\">Cancel</ion-button>\n        <ion-button type=\"submit\" fill=\"clear\" [disabled]=\"addToInventoryForm.invalid\">\n          Add Product\n        </ion-button>\n      </ion-row>\n    </ion-item>\n  </form>\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=main-main-module.js.map