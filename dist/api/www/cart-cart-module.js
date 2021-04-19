(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cart-cart-module"],{

/***/ "Bzap":
/*!*****************************************!*\
  !*** ./src/app/main/cart/cart.page.css ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXJ0LnBhZ2UuY3NzIn0= */");

/***/ }),

/***/ "POM6":
/*!******************************************!*\
  !*** ./src/app/main/cart/cart.module.ts ***!
  \******************************************/
/*! exports provided: CartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartModule", function() { return CartModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _cart_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart-routing.module */ "rmwr");
/* harmony import */ var _cart_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart.page */ "yu5B");







let CartModule = class CartModule {
};
CartModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_cart_page__WEBPACK_IMPORTED_MODULE_6__["CartPage"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _cart_routing_module__WEBPACK_IMPORTED_MODULE_5__["CartRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]]
    })
], CartModule);



/***/ }),

/***/ "UEvv":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/cart/cart.page.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title class=\"ion-padding-top\">\n      Cart\n      <ion-label *ngIf=\"currentGroup?.name\"><small>({{currentGroup?.name|titlecase}})</small></ion-label>\n    </ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\" *ngIf=\"searchString === ''\">\n      <ion-button (click)=\"presentCategoryFilterPopover()\" size=\"small\">\n        <ion-icon name=\"filter-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-grid>\n      <ion-row class=\"ion-justify-content-center\">\n        <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" size-lg=\"6\" size-xl=\"4\"\n          class=\"ion-margin-start ion-margin-end ion-no-padding\">\n          <ion-searchbar color=\"light\" showCancelButton=\"focus\" [(ngModel)]=\"searchString\" #searchStr\n            (ionInput)=\"getProductList(searchStr.value)\">\n          </ion-searchbar>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-buttons slot=\"end\" *ngIf=\"searchString === ''\">\n      <ion-button (click)=\"presentSortPopover()\" size=\"small\">\n        <ion-icon name=\"funnel-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row class=\"ion-justify-content-center\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" class=\"ion-text-center\">\n        <ion-toolbar size=\"12\" class=\"ion-text-center\" style=\"background-color: #1f1f1f;\">\n          <ion-title *ngIf=\"(productError === '' && searchString === '') ||\n          (filterError === '' && searchString !== ''); else errorCondition\">{{selectedCategory.name | titlecase}}\n          </ion-title>\n          <ng-template #errorCondition>\n            <ion-title>Operation Failed</ion-title>\n          </ng-template>\n        </ion-toolbar>\n\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" *ngIf=\"searchString === '' && products?.length > 0\">\n          <ion-card>\n            <ion-item style=\"font-size: 0.9rem;\">\n              <ion-label color=\"primary\">Estimated Cost</ion-label>\n              <ion-text color=\"success\">{{cartCost}} /-</ion-text>\n            </ion-item>\n          </ion-card>\n          <ion-card *ngFor=\"let product of products\">\n            <ion-card-header>\n              <ion-card-title>\n                {{product?.name | titlecase}}\n              </ion-card-title>\n              <ion-card-subtitle>\n                {{product?.brand | titlecase}}\n              </ion-card-subtitle>\n            </ion-card-header>\n            <ion-card-content>\n              <ion-item *ngIf=\"product?.size\">\n                <ion-label>\n                  Size: {{product?.size | titlecase}}\n                </ion-label>\n              </ion-item>\n              <ion-item *ngIf=\"product?.quantity\">\n                <ion-label>\n                  Quantity: {{product?.quantity}}\n                </ion-label>\n              </ion-item>\n              <ion-item *ngIf=\"product?.price\">\n                <ion-label>Price: {{product?.price}}</ion-label>\n              </ion-item>\n              <ion-item>\n                <ion-label>Cart: {{product?.cart[currentGroup.id]}}</ion-label>\n              </ion-item>\n            </ion-card-content>\n            <ion-row class=\"ion-justify-content-center\">\n              <ion-button fill=\"clear\" color=\"dark\" (click)=\"presentCartActionSheet(product)\">\n                <ion-icon name=\"ellipsis-horizontal\"></ion-icon>\n              </ion-button>\n            </ion-row>\n          </ion-card>\n        </ion-list>\n\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" class=\"ion-padding\" *ngIf=\"searchString === ''\">\n          <ion-text *ngIf=\"productError === '' && products?.length === 0\">{{searchStatus}}</ion-text>\n          <ion-text *ngIf=\"productError !== ''\">{{productError}}</ion-text>\n        </ion-list>\n\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" *ngIf=\"searchString !== '' && filtered.length > 0\">\n          <ion-card>\n            <ion-item style=\"font-size: 0.9rem;\">\n              <ion-label color=\"primary\">Estimated Cost</ion-label>\n              <ion-text color=\"success\">{{filteredCost}} /-</ion-text>\n            </ion-item>\n          </ion-card>\n          <ion-card *ngFor=\"let product of filtered\">\n            <ion-card-header>\n              <ion-card-title>\n                {{product?.name | titlecase}}\n              </ion-card-title>\n              <ion-card-subtitle>\n                {{product?.brand | titlecase}}\n              </ion-card-subtitle>\n            </ion-card-header>\n            <ion-card-content>\n              <ion-item *ngIf=\"product?.size\">Size: {{product?.size | titlecase}}</ion-item>\n              <ion-item *ngIf=\"product?.quantity\">Quantity: {{product?.quantity}}</ion-item>\n              <ion-item *ngIf=\"product?.price\">Price: {{product?.price}}</ion-item>\n              <ion-item>Stock:\n                {{product?.stockCount[currentGroup.id]}}\n              </ion-item>\n              <ion-item>Status:\n                {{product?.stockStatus[currentGroup.id] === '' ? 'Empty' : product?.stockStatus[currentGroup.id] | titlecase}}\n              </ion-item>\n              <ion-item>Cart:\n                <ion-button fill=\"clear\" color=\"dark\" size=\"small\" (click)=\"updateProductCartCount(product, -1);\"\n                  [disabled]=\"updateLock || product?.cart[currentGroup.id] === 0\">\n                  <ion-icon name=\"caret-down-outline\"></ion-icon>\n                </ion-button>\n                <ion-text>{{product?.cart[currentGroup.id]}}</ion-text>\n                <ion-button fill=\"clear\" color=\"dark\" size=\"small\" (click)=\"updateProductCartCount(product, 1);\"\n                  [disabled]=\"updateLock\">\n                  <ion-icon name=\"caret-up-outline\"></ion-icon>\n                </ion-button>\n              </ion-item>\n              <ion-item lines=\"none\" *ngIf=\"showDoneButton\">\n                <ion-col class=\"ion-text-center ion-padding-top\">\n                  <ion-button fill=\"clear\" (click)=\"showDoneButton = false; searchString = ''\">Done</ion-button>\n                </ion-col>\n              </ion-item>\n            </ion-card-content>\n          </ion-card>\n        </ion-list>\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" class=\"ion-padding\" *ngIf=\"searchString !== ''\">\n          <ion-text *ngIf=\"searchString !== '' && filterError === '' && filtered?.length === 0\">{{filterStatus}}\n          </ion-text>\n          <ion-text *ngIf=\"searchString !== '' && filterError !== ''\">{{filterError}}</ion-text>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n");

/***/ }),

/***/ "rmwr":
/*!**************************************************!*\
  !*** ./src/app/main/cart/cart-routing.module.ts ***!
  \**************************************************/
/*! exports provided: CartRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartRoutingModule", function() { return CartRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _cart_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart.page */ "yu5B");




const routes = [{
        path: '',
        component: _cart_page__WEBPACK_IMPORTED_MODULE_3__["CartPage"]
    },];
let CartRoutingModule = class CartRoutingModule {
};
CartRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], CartRoutingModule);



/***/ }),

/***/ "yu5B":
/*!****************************************!*\
  !*** ./src/app/main/cart/cart.page.ts ***!
  \****************************************/
/*! exports provided: CartPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPage", function() { return CartPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_cart_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./cart.page.html */ "UEvv");
/* harmony import */ var _cart_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart.page.css */ "Bzap");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _settings_manage_app_modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../settings/manage-app/modals/confirm-delete/confirm-delete.component */ "OVtC");
/* harmony import */ var _modals_add_to_inventory_add_to_inventory_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modals/add-to-inventory/add-to-inventory.component */ "kMKV");
/* harmony import */ var _modals_filter_products_filter_products_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modals/filter-products/filter-products.component */ "O8PA");
/* harmony import */ var _modals_sort_products_sort_products_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modals/sort-products/sort-products.component */ "43od");
/* harmony import */ var _services_cart_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../services/cart.service */ "c14U");
/* harmony import */ var _services_inventory_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../services/inventory.service */ "rRBh");
/* harmony import */ var _services_expense_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../services/expense.service */ "svBU");
/* harmony import */ var _services_toaster_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../../services/toaster.service */ "Ymxs");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../services/settings.service */ "6nr9");
/* harmony import */ var _services_searchbar_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../../services/searchbar.service */ "D7eQ");







// components




// services






let CartPage = class CartPage {
    constructor(settingsService, toasterService, cartService, inventoryService, searchBarService, expenseService, alertController, popoverController, actionSheetController, router) {
        this.settingsService = settingsService;
        this.toasterService = toasterService;
        this.cartService = cartService;
        this.inventoryService = inventoryService;
        this.searchBarService = searchBarService;
        this.expenseService = expenseService;
        this.alertController = alertController;
        this.popoverController = popoverController;
        this.actionSheetController = actionSheetController;
        this.router = router;
        this.allProducts = [];
        // filtered array is used for rendering products filtered from searchbar
        this.filtered = [];
        this.currentGroup = {
            id: '',
            name: ''
        };
        // stores filtered value for categories
        // default is all products
        this.selectedCategory = {
            id: '',
            name: 'all products'
        };
        // sort filter
        // sort by price or cart units
        this.sortBy = 'none';
        this.productError = '';
        this.filterError = '';
        this.searchString = '';
        this.searchStatus = 'No Items Found';
        this.showDoneButton = false;
        this.cartCost = 0;
        this.filteredCost = 0;
        // all buttons are disabled when the update lock is true
        this.updateLock = false;
    }
    ionViewDidEnter() {
        this.searchStatus = 'Loading Cart';
        // extracting the currentGroup name from the settings
        try {
            this.currentGroup.id = this.settingsService.settings.currentGroup;
        }
        catch (error) {
            this.currentGroup.id = '';
        }
        if (!this.currentGroup.id) {
            this.presentAddGroupAlert();
        }
        if (this.currentGroup.id) {
            const groups = this.settingsService.settings.groups;
            if (groups) {
                groups.forEach(group => {
                    if (group[this.currentGroup.id]) {
                        this.currentGroup.name = group[this.currentGroup.id];
                        return;
                    }
                });
            }
            if (!groups) {
                this.currentGroup = {
                    id: '',
                    name: ''
                };
            }
            this.cartService.getCart(this.currentGroup.id, this.selectedCategory.id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe((products) => {
                // maintainig original copy of the data
                // used to render products the searchbar is cleared
                this.allProducts = [...products];
                this.products = products;
                if (this.products.length === 0) {
                    this.searchStatus = 'No Items Found';
                }
                else {
                    this.cartCost = 0;
                    this.cartCost = this.calculateCartCost(this.products);
                }
            }, (error) => {
                this.productError = error;
                this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
            });
        }
    }
    ionViewDidLeave() {
        this.filtered = [];
        this.products = [];
        this.selectedCategory = {
            id: '',
            name: 'All Products'
        };
        this.sortBy = 'none';
        this.searchString = '';
    }
    getProductList(searchStr) {
        this.filtered = [];
        // regex will remove special characters from the search string
        searchStr = searchStr.replace(/[^a-zA-Z]/g, '');
        this.searchString = searchStr;
        if (searchStr !== '') {
            this.filterStatus = 'Searching Products';
            this.filtered = [];
            this.searchBarService.getProductList(searchStr, this.selectedCategory.id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe((data) => {
                this.filtered = data;
                if (this.filtered.length === 0) {
                    this.filterStatus = 'No Items Found';
                }
                else {
                    this.filteredCost = 0;
                    this.filteredCost = this.calculateCartCost(this.filtered);
                }
            }, (error) => {
                this.filterError = error;
                this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
            });
        }
        else {
            this.showDoneButton = false;
        }
    }
    updateProductCartCount(product, count) {
        if (this.currentGroup.id.length > 0) {
            this.updateLock = true;
            this.cartService.updateCartCount(product._id, count, this.currentGroup.id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(() => {
                product.cart[this.currentGroup.id] += count;
                this.updateProducts(product);
                // neutralize sort filter
                this.sortBy = 'none';
                this.updateLock = false;
                this.toasterService.presentToast('', 'Cart Updated', 500);
            }, (error) => {
                this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
            });
        }
        else {
            this.presentAddGroupAlert();
        }
    }
    // popover and alert functions
    presentCategoryFilterPopover() {
        let categories = [{
                '': 'All Products'
            },];
        categories = categories.concat(this.settingsService.settings.categories);
        this.popoverController.create({
            component: _modals_filter_products_filter_products_component__WEBPACK_IMPORTED_MODULE_9__["FilterProductsComponent"],
            componentProps: {
                categories,
                selectedCategory: this.selectedCategory.id
            }
        }).then((popoverEl) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
        }).then((popoverResult) => {
            if (popoverResult.role === 'filter') {
                this.selectedCategory.id = popoverResult.data.id;
                this.selectedCategory.name = popoverResult.data.name;
                this.applyProductCategoryFilter(this.selectedCategory.id);
            }
        });
    }
    presentSortPopover() {
        this.popoverController.create({
            component: _modals_sort_products_sort_products_component__WEBPACK_IMPORTED_MODULE_10__["SortProductsComponent"],
            componentProps: {
                sortBy: this.sortBy
            },
        }).then((popoverEl) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
        }).then((popoverResult) => {
            if (popoverResult.role === 'filter') {
                this.sortBy = popoverResult.data;
                this.products = this.applyProductSortFilter(popoverResult.data);
            }
        });
    }
    presentCartActionSheet(product) {
        this.actionSheetController.create({
            header: 'Options',
            buttons: [{
                    text: 'Cancel',
                    icon: 'close-outline',
                    role: 'destructive'
                }, {
                    text: 'Manage Product',
                    icon: 'create-outline',
                    handler: () => {
                        this.filtered.push(product);
                        this.filteredCost = +product.price * +product.cart[this.currentGroup.id];
                        this.showDoneButton = true;
                        this.searchString = product.name;
                    }
                }, {
                    text: 'Add To Inventory',
                    icon: 'home-outline',
                    handler: () => {
                        this.popoverController.create({
                            component: _modals_add_to_inventory_add_to_inventory_component__WEBPACK_IMPORTED_MODULE_8__["AddToInventoryComponent"],
                            componentProps: {
                                product,
                                gid: this.currentGroup.id
                            }
                        }).then((popoverEl) => {
                            popoverEl.present();
                            return popoverEl.onDidDismiss();
                        }).then((popoverResult) => {
                            if (popoverResult.role == 'create') {
                                // only add to inventory when the units and cost is greater that zero
                                if (popoverResult.data.units > 0 && popoverResult.data.cost > 0) {
                                    // first update the products cart count to zero by subracting  product.cart[this.currentGroup.id]
                                    this.cartService.updateCartCount(product._id, -product.cart[this.currentGroup.id], this.currentGroup.id).subscribe(() => {
                                        /// update the products cart count locally
                                        product.cart[this.currentGroup.id] -= product.cart[this.currentGroup.id];
                                        this.updateProducts(product);
                                        this.sortBy = 'none';
                                        this.updateLock = false;
                                        // update the inventory
                                        this.inventoryService.updateStockCount(product._id, popoverResult.data.units, this.currentGroup.id).subscribe(() => {
                                            // if the products was previously empty, update the stok status to full
                                            if (product.stockCount[this.currentGroup.id] === 0) {
                                                this.inventoryService.updateStockStatus(product._id, 'full', this.currentGroup.id).subscribe(() => { }, (error) => {
                                                    this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                                                });
                                            }
                                            const expense = {
                                                pid: product._id,
                                                cid: product.cid,
                                                gid: this.currentGroup.id,
                                                cost: popoverResult.data.cost,
                                                units: popoverResult.data.units,
                                                name: product.name,
                                                brand: product.brand,
                                                date: {
                                                    date: new Date().getDate(),
                                                    month: new Date().getMonth() + 1,
                                                    year: new Date().getFullYear()
                                                }
                                            };
                                            // adding expense
                                            this.expenseService.addExpense(expense).subscribe(() => {
                                            }, (error) => {
                                                this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                                            });
                                            this.toasterService.presentToast('', 'Inventory Updated', 500);
                                        });
                                    }, (error) => {
                                        this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                                    });
                                }
                            }
                        });
                    }
                }, {
                    text: 'Remove From Cart',
                    icon: 'bag-remove-outline',
                    handler: () => {
                        this.popoverController.create({
                            component: _settings_manage_app_modals_confirm_delete_confirm_delete_component__WEBPACK_IMPORTED_MODULE_7__["ConfirmDeleteComponent"],
                            componentProps: {
                                type: 'Cart Item',
                                message: 'Are you sure you want to remove this item from the cart?'
                            }
                        }).then((popoverEl) => {
                            popoverEl.present();
                            return popoverEl.onDidDismiss();
                        }).then(popoverResult => {
                            if (popoverResult.role === 'delete') {
                                this.cartService.updateCartCount(product._id, -product.cart[this.currentGroup.id], this.currentGroup.id).subscribe(() => {
                                    product.cart[this.currentGroup.id] -= product.cart[this.currentGroup.id];
                                    this.updateProducts(product);
                                    this.sortBy = 'none';
                                    this.updateLock = false;
                                    this.toasterService.presentToast('', 'Cart Updated', 500);
                                });
                            }
                        });
                    }
                }]
        }).then((actionEl) => {
            actionEl.present();
        });
    }
    presentAddGroupAlert() {
        this.alertController.create({
            header: 'No Group Selected',
            message: 'Please go to settings and select a group.',
            buttons: [{
                    text: 'Ok',
                    handler: () => {
                        this.router.navigate(['/', 'app', 'settings', 'manage-app']);
                    }
                }]
        }).then((alertEl) => {
            alertEl.present();
        });
    }
    // utility functions
    updateProducts(product) {
        const index = this.products.findIndex((prod) => {
            if (prod._id === product._id) {
                return true;
            }
        });
        if (index !== -1) {
            this.products[index] = product;
        }
        else {
            this.products = [product].concat(this.products);
        }
        this.products = this.products.filter((prod) => {
            if (prod.cart[this.currentGroup.id] !== 0) {
                return true;
            }
        });
        this.cartCost = 0;
        this.products.forEach((prod) => {
            this.cartCost += +prod.price * +prod.cart[this.currentGroup.id];
        });
        this.filteredCost = 0;
        this.filteredCost += +product.price * +product.cart[this.currentGroup.id];
        this.allProducts = [...this.products];
    }
    applyProductCategoryFilter(cid) {
        if (cid === '') {
            this.cartCost = 0;
            this.products = this.allProducts;
            this.cartCost = this.calculateCartCost(this.products);
            return;
        }
        const tempProducts = [...this.allProducts];
        this.products = tempProducts.filter((prod) => {
            if (prod.cid === cid) {
                return true;
            }
        });
        this.cartCost = 0;
        this.cartCost = this.calculateCartCost(this.products);
    }
    applyProductSortFilter(sortBy) {
        const tempProducts = [...this.allProducts];
        let products;
        if (sortBy === 'none') {
            products = this.allProducts;
            return products;
        }
        if (sortBy === 'price') {
            products = tempProducts.sort((prod1, prod2) => {
                return +prod1.price - +prod2.price;
            });
        }
        if (sortBy === 'units') {
            products = tempProducts.sort((prod1, prod2) => {
                return prod1.cart[this.currentGroup.id] - prod2.cart[this.currentGroup.id];
            });
        }
        return products;
    }
    calculateCartCost(products) {
        let cost = 0;
        products.forEach((prod) => {
            cost += +prod.cart[this.currentGroup.id] * +prod.price;
        });
        return cost;
    }
};
CartPage.ctorParameters = () => [
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_15__["SettingsService"] },
    { type: _services_toaster_service__WEBPACK_IMPORTED_MODULE_14__["ToasterService"] },
    { type: _services_cart_service__WEBPACK_IMPORTED_MODULE_11__["CartService"] },
    { type: _services_inventory_service__WEBPACK_IMPORTED_MODULE_12__["InventoryService"] },
    { type: _services_searchbar_service__WEBPACK_IMPORTED_MODULE_16__["SearchBarService"] },
    { type: _services_expense_service__WEBPACK_IMPORTED_MODULE_13__["ExpenseService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
CartPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-cart',
        template: _raw_loader_cart_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_cart_page_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CartPage);



/***/ })

}]);
//# sourceMappingURL=cart-cart-module.js.map