(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["inventory-inventory-module"],{

/***/ "7PMV":
/*!***************************************************!*\
  !*** ./src/app/main/inventory/inventory.page.css ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".add-icon{\n    background-color: black;    \n    margin-left: -40px;\n}\n\n.add-icon:hover{\n    background-color: #222428;    \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludmVudG9yeS5wYWdlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHVCQUF1QjtJQUN2QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0IiLCJmaWxlIjoiaW52ZW50b3J5LnBhZ2UuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFkZC1pY29ue1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrOyAgICBcbiAgICBtYXJnaW4tbGVmdDogLTQwcHg7XG59XG5cbi5hZGQtaWNvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyNDI4OyAgICBcbn0iXX0= */");

/***/ }),

/***/ "7vjK":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/inventory/inventory.page.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title class=\"ion-padding-top\">\n      Inventory\n      <ion-label *ngIf=\"groupName\"><small>({{groupName|titlecase}})</small></ion-label>\n    </ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\" *ngIf=\"searchString === ''\">\n      <ion-button (click)=\"presentCategoryFilterAlert()\" size=\"small\">\n        <ion-icon name=\"filter-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-grid>\n      <ion-row class=\"ion-justify-content-center\">\n        <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" size-lg=\"6\" size-xl=\"4\"\n          class=\"ion-margin-start ion-margin-end ion-no-padding\">\n          <ion-searchbar color=\"light\" showCancelButton=\"focus\" [(ngModel)]=\"searchString\" #searchStr\n            (ionInput)=\"getProductList(searchStr.value)\">\n          </ion-searchbar>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-buttons slot=\"end\" *ngIf=\"searchString === ''\">\n      <ion-button (click)=\"presentSortAlert()\" size=\"small\">\n        <ion-icon name=\"funnel-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row class=\"ion-justify-content-center\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" class=\"ion-text-center\">\n        <ion-toolbar size=\"12\" class=\"ion-text-center\" style=\"background-color: #1f1f1f;\">\n          <ion-title *ngIf=\"(productError === '' && searchString === '') ||\n          (filterError === '' && searchString !== ''); else errorCondition\">{{selectedCategory.name | titlecase}}\n          </ion-title>\n          <ng-template #errorCondition>\n            <ion-title>Operation Failed</ion-title>\n          </ng-template>\n        </ion-toolbar>\n\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" *ngIf=\"searchString === '' && products?.length > 0\">\n          <ion-card *ngFor=\"let product of products\">\n            <ion-card-header>\n              <ion-card-title>\n                {{product?.name | titlecase}}\n              </ion-card-title>\n              <ion-card-subtitle>\n                {{product?.brand | titlecase}}\n              </ion-card-subtitle>\n            </ion-card-header>\n            <ion-card-content>\n              <ion-item *ngIf=\"product?.size\">\n                <ion-label>\n                  Size: {{product?.size | titlecase}}\n                </ion-label>\n              </ion-item>\n              <ion-item *ngIf=\"product?.quantity\">\n                <ion-label>\n                  Quantity: {{product?.quantity}} {{product?.unit}}\n                </ion-label>\n              </ion-item>\n              <ion-item *ngIf=\"product?.price\">\n                <ion-label>Price: {{product?.price}}</ion-label>\n              </ion-item>\n              <ion-item>\n                <ion-label>Stock: {{product?.stockCount[currentGroup]}} {{product?.unit}}</ion-label>\n              </ion-item>\n              <ion-item>\n                <ion-label>Status:\n                  {{product?.stockStatus[currentGroup] === '' ? 'Empty': product?.stockStatus[currentGroup] | titlecase}}\n                </ion-label>\n              </ion-item>\n            </ion-card-content>\n            <ion-row class=\"ion-justify-content-center\">\n              <ion-button fill=\"clear\" color=\"dark\" (click)=\"presentInventoryActionSheet(product)\">\n                <ion-icon name=\"ellipsis-horizontal\"></ion-icon>\n              </ion-button>\n            </ion-row>\n          </ion-card>\n        </ion-list>\n\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" class=\"ion-padding\" *ngIf=\"searchString === ''\">\n          <ion-text *ngIf=\"productError === '' && products?.length === 0\">{{searchStatus}}</ion-text>\n          <ion-text *ngIf=\"productError !== ''\">{{productError}}</ion-text>\n        </ion-list>\n\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" *ngIf=\"searchString !== '' && filtered.length > 0\">\n          <ion-card *ngFor=\"let product of filtered\">\n            <ion-card-header>\n              <ion-card-title>\n                {{product?.name | titlecase}}\n              </ion-card-title>\n              <ion-card-subtitle>\n                {{product?.brand | titlecase}}\n              </ion-card-subtitle>\n            </ion-card-header>\n            <ion-card-content>\n              <ion-item *ngIf=\"product?.size\">Size: {{product?.size | titlecase}}</ion-item>\n              <ion-item *ngIf=\"product?.quantity\">Quantity: {{product?.quantity}} {{product?.unit}}</ion-item>\n              <ion-item *ngIf=\"product?.price\">Price: {{product?.price}}</ion-item>\n              <!-- <ion-item>Stock:\n                <ion-button fill=\"clear\" color=\"dark\" size=\"small\" (click)=\"updateProductStockCount(product, -1);\"\n                  [disabled]=\"updateLock || product?.stockCount[currentGroup] === 0\">\n                  <ion-icon name=\"caret-down-outline\"></ion-icon>\n                </ion-button>\n                <ion-text>{{product?.stockCount[currentGroup]}} {{product?.unit}}</ion-text>\n                <ion-button fill=\"clear\" color=\"dark\" size=\"small\" (click)=\"updateProductStockCount(product, 1);\"\n                  [disabled]=\"updateLock\">\n                  <ion-icon name=\"caret-up-outline\"></ion-icon>\n                </ion-button>\n              </ion-item> -->\n              <ion-item>Stock: {{product?.stockCount[currentGroup]}} {{product?.unit}}\n                <ion-button fill=\"clear\" color=\"dark\" (click) = \"presentManageStockAlert(product)\">\n                  <ion-icon name=\"create-outline\"></ion-icon>\n                </ion-button>\n              </ion-item>\n              <ion-item>\n                <ion-label>Status:</ion-label>\n                <ion-select okText=\"Okay\" cancelText=\"Dismiss\"\n                  [value]=\"product?.stockStatus[currentGroup] !== '' ? product?.stockStatus[currentGroup]: 'empty'\"\n                  #stockStatus (ionChange)=\"updateProductStockStatus(product, stockStatus.value)\"\n                  [disabled]=\"updateLock\">\n                  <ion-select-option value=\"full\">Full</ion-select-option>\n                  <ion-select-option value=\"half\">Half</ion-select-option>\n                  <ion-select-option value=\"almost empty\">Almost Empty</ion-select-option>\n                  <ion-select-option value=\"empty\" disabled>Empty</ion-select-option>\n                </ion-select>\n              </ion-item>\n              <ion-item lines=\"none\" *ngIf=\"showDoneButton\">\n                <ion-col class=\"ion-text-center ion-padding-top\">\n                  <ion-button fill=\"clear\" (click)=\"showDoneButton = false; searchString = ''\">Done</ion-button>\n                </ion-col>\n              </ion-item>\n            </ion-card-content>\n          </ion-card>\n        </ion-list>\n        <ion-list style=\"background-color: rgb(40, 41, 44);\" class=\"ion-padding\" *ngIf=\"searchString !== ''\">\n          <ion-text *ngIf=\"searchString !== '' && filterError === '' && filtered?.length === 0\">{{filterStatus}}\n          </ion-text>\n          <ion-text *ngIf=\"searchString !== '' && filterError !== ''\">{{filterError}}</ion-text>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n");

/***/ }),

/***/ "VzXA":
/*!****************************************************!*\
  !*** ./src/app/main/inventory/inventory.module.ts ***!
  \****************************************************/
/*! exports provided: InventoryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryModule", function() { return InventoryModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _inventory_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inventory.page */ "fFfJ");
/* harmony import */ var _inventory_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inventory-routing.module */ "seXp");







let InventoryModule = class InventoryModule {
};
InventoryModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_inventory_page__WEBPACK_IMPORTED_MODULE_5__["InventoryPage"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _inventory_routing_module__WEBPACK_IMPORTED_MODULE_6__["InventoryRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]]
    })
], InventoryModule);



/***/ }),

/***/ "fFfJ":
/*!**************************************************!*\
  !*** ./src/app/main/inventory/inventory.page.ts ***!
  \**************************************************/
/*! exports provided: InventoryPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryPage", function() { return InventoryPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_inventory_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./inventory.page.html */ "7vjK");
/* harmony import */ var _inventory_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inventory.page.css */ "7PMV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _cart_modals_filter_products_filter_products_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../cart/modals/filter-products/filter-products.component */ "O8PA");
/* harmony import */ var _cart_modals_sort_products_sort_products_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../cart/modals/sort-products/sort-products.component */ "43od");
/* harmony import */ var _services_cart_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../services/cart.service */ "c14U");
/* harmony import */ var _services_inventory_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../services/inventory.service */ "rRBh");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../services/settings.service */ "6nr9");
/* harmony import */ var _services_searchbar_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../services/searchbar.service */ "D7eQ");
/* harmony import */ var _services_toaster_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../services/toaster.service */ "Ymxs");







// components


// services





let InventoryPage = class InventoryPage {
    constructor(searchBarService, inventoryService, alertController, actionSheetController, popoverController, settingsService, cartService, toasterService, router) {
        this.searchBarService = searchBarService;
        this.inventoryService = inventoryService;
        this.alertController = alertController;
        this.actionSheetController = actionSheetController;
        this.popoverController = popoverController;
        this.settingsService = settingsService;
        this.cartService = cartService;
        this.toasterService = toasterService;
        this.router = router;
        this.allProducts = [];
        // filtered array is used for rendering products filtered from searchbar
        this.filtered = [];
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
        // all buttons are disabled when the update lock is true
        this.updateLock = false;
    }
    ionViewDidEnter() {
        this.searchStatus = 'Loading Inventory';
        this.getProductsView = this.settingsService.settings.getProductsView;
        // extracting the currentGroup name from the settings
        try {
            this.currentGroup = this.settingsService.settings.currentGroup;
        }
        catch (error) {
            this.currentGroup = '';
        }
        if (!this.currentGroup) {
            this.presentAddGroupAlert();
        }
        let groups = [];
        try {
            groups = this.settingsService.settings.groups;
        }
        catch (error) {
            groups = [];
        }
        if (groups) {
            groups.forEach(group => {
                if (group[this.currentGroup]) {
                    this.groupName = group[this.currentGroup];
                    return;
                }
            });
        }
        if (!groups) {
            this.groupName = '';
        }
        if (this.currentGroup) {
            this.inventoryService.getInventory(this.getProductsView, this.selectedCategory.id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe((products) => {
                // maintainig original copy of the data
                // used to render products the searchbar is cleared
                this.allProducts = products;
                this.products = products;
                if (this.products.length === 0) {
                    this.searchStatus = 'No Items Found';
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
        if (this.getProductsView === 'all') {
            this.filterProducts(searchStr);
        }
        else {
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
                }, (error) => {
                    this.filterError = error;
                    this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                });
            }
            if (searchStr !== '') {
                this.showDoneButton = false;
            }
        }
    }
    updateProductStockCount(product, count) {
        if (this.currentGroup.length > 0) {
            this.updateLock = true;
            this.inventoryService.updateStockCount(product._id, count, this.currentGroup).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(() => {
                product.stockCount[this.currentGroup] = count;
                this.updateProducts(product);
                // neutralize sort filter
                this.sortBy = 'none';
                this.updateLock = false;
                this.toasterService.presentToast('', 'Inventoy Updated', 500);
            }, (error) => {
                this.updateLock = false;
                this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
            });
            if (count > 0 && product.stockStatus[this.currentGroup] === 'empty' ||
                count > 0 && !product.stockStatus[this.currentGroup]) {
                console.log('called');
                this.inventoryService.updateStockStatus(product._id, 'full', this.currentGroup).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(() => {
                    product.stockStatus[this.currentGroup] = 'full';
                    this.updateProducts(product);
                }, (error) => {
                    this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                });
            }
            if (count === 0) {
                this.inventoryService.updateStockStatus(product._id, 'empty', this.currentGroup).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(() => {
                    product.stockStatus[this.currentGroup] = 'empty';
                    this.updateProducts(product);
                }, (error) => {
                    this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                });
            }
        }
        else {
            this.alertController.create({
                header: 'No Group Selected',
                message: 'Please go to settings and select a group.',
                buttons: [{
                        text: 'Cancel',
                        role: 'cancel'
                    }, {
                        text: 'Ok',
                        handler: () => {
                            this.router.navigate(['/', 'app', 'settings', 'manage-app']);
                        }
                    }]
            }).then((alertEl) => {
                alertEl.present();
            });
        }
    }
    updateProductStockStatus(product, status) {
        if (this.currentGroup.length > 0) {
            if (status === 'empty') {
                this.alertController.create({
                    header: 'Out of stock?',
                    message: 'Do you want to add this product to cart?',
                    inputs: [{
                            type: 'number',
                            name: 'count',
                            placeholder: 'Number of products'
                        }],
                    buttons: [{
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                if (this.getProductsView === 'partial') {
                                    this.products = this.products.filter(prod => {
                                        if (prod._id !== product._id) {
                                            return true;
                                        }
                                    });
                                }
                            }
                        }, {
                            text: 'Okay',
                            handler: (data) => {
                                this.cartService.updateCartCount(product._id, +data.count, this.currentGroup).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(() => {
                                    this.toasterService.presentToast('', 'Cart Updated', 500);
                                    this.inventoryService.updateStockStatus(product._id, status, this.currentGroup).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(() => {
                                        product.stockStatus[this.currentGroup] = status;
                                        if (product.stockStatus[this.currentGroup] !== 'empty') {
                                            this.updateProducts(product);
                                        }
                                    });
                                }, (error) => {
                                    this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                                });
                            }
                        }]
                }).then((alertEl) => {
                    alertEl.present();
                });
            }
            else {
                this.inventoryService.updateStockStatus(product._id, status, this.currentGroup).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(() => {
                    product.stockStatus[this.currentGroup] = status;
                    if (product.stockStatus[this.currentGroup] !== '') {
                        this.updateProducts(product);
                        this.toasterService.presentToast('', 'Inventoy Updated', 500);
                    }
                    if (product.stockCount[this.currentGroup] === 0) {
                        this.inventoryService.updateStockCount(product._id, 1, this.currentGroup).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(() => {
                            product.stockCount[this.currentGroup] = 1;
                            this.updateProducts(product);
                            this.sortBy = 'none';
                            this.toasterService.presentToast('', 'Inventoy Updated', 500);
                        }, (error) => {
                            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                        });
                    }
                }, (error) => {
                    this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                });
            }
        }
        else {
            this.presentAddGroupAlert();
        }
    }
    // popover and alert functions
    presentCategoryFilterAlert() {
        let categories = [{
                '': 'All Products'
            },];
        categories = categories.concat(this.settingsService.settings.categories);
        this.popoverController.create({
            component: _cart_modals_filter_products_filter_products_component__WEBPACK_IMPORTED_MODULE_7__["FilterProductsComponent"],
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
    presentSortAlert() {
        this.popoverController.create({
            component: _cart_modals_sort_products_sort_products_component__WEBPACK_IMPORTED_MODULE_8__["SortProductsComponent"],
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
    presentInventoryActionSheet(product) {
        this.actionSheetController.create({
            header: 'Options',
            buttons: [{
                    text: 'Cancel',
                    icon: 'close-outline',
                    role: 'desctructive'
                }, {
                    text: 'Manage Product',
                    icon: 'create-outline',
                    handler: () => {
                        this.filtered = [];
                        this.filtered.push(product);
                        this.showDoneButton = true;
                        this.searchString = product.name;
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
    presentManageStockAlert(product) {
        this.alertController.create({
            header: 'Update Stock',
            inputs: [{
                    type: 'number',
                    name: 'stockCount',
                    value: product.stockCount[this.currentGroup],
                    placeholder: 'Stock Count'
                }],
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel'
                }, {
                    text: 'Update',
                    handler: (data) => {
                        this.updateProductStockCount(product, +data.stockCount);
                    }
                }
            ]
        }).then(alertEl => {
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
        if (this.getProductsView === 'partial') {
            this.products = this.products.filter((prod) => {
                if (prod.stockStatus[this.currentGroup] !== 'empty') {
                    return true;
                }
            });
        }
        this.allProducts = this.products;
    }
    applyProductCategoryFilter(cid) {
        if (cid === '') {
            this.products = this.allProducts;
            return;
        }
        const tempProducts = [...this.allProducts];
        this.products = tempProducts.filter(prod => {
            if (prod.cid === cid) {
                return true;
            }
        });
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
                return prod1.stockCount[this.currentGroup] - prod2.stockCount[this.currentGroup];
            });
        }
        return products;
    }
    filterProducts(searchStr) {
        // regex will remove special characters from the search string
        searchStr = searchStr.replace(/[^a-zA-Z]/g, '');
        if (searchStr !== '') {
            this.searchString = searchStr;
            let tempArr = [];
            let regExp = new RegExp(`^.*${searchStr}.*$`, 'i');
            for (let product of this.allProducts) {
                if (regExp.test(product.name)) {
                    tempArr.push(product);
                }
            }
            this.filtered = tempArr;
        }
        if (searchStr === '') {
            this.filtered = [];
        }
    }
};
InventoryPage.ctorParameters = () => [
    { type: _services_searchbar_service__WEBPACK_IMPORTED_MODULE_12__["SearchBarService"] },
    { type: _services_inventory_service__WEBPACK_IMPORTED_MODULE_10__["InventoryService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"] },
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_11__["SettingsService"] },
    { type: _services_cart_service__WEBPACK_IMPORTED_MODULE_9__["CartService"] },
    { type: _services_toaster_service__WEBPACK_IMPORTED_MODULE_13__["ToasterService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
InventoryPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-inventory',
        template: _raw_loader_inventory_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_inventory_page_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], InventoryPage);



/***/ }),

/***/ "seXp":
/*!************************************************************!*\
  !*** ./src/app/main/inventory/inventory-routing.module.ts ***!
  \************************************************************/
/*! exports provided: InventoryRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryRoutingModule", function() { return InventoryRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _inventory_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inventory.page */ "fFfJ");




const routes = [{
        path: '',
        component: _inventory_page__WEBPACK_IMPORTED_MODULE_3__["InventoryPage"]
    }];
let InventoryRoutingModule = class InventoryRoutingModule {
};
InventoryRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], InventoryRoutingModule);



/***/ })

}]);
//# sourceMappingURL=inventory-inventory-module.js.map