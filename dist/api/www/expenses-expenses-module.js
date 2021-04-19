(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["expenses-expenses-module"],{

/***/ "9qSG":
/*!*****************************************************************************!*\
  !*** ./src/app/main/expenses/modals/add-expense/add-expense.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtZXhwZW5zZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "9zHM":
/*!************************************************!*\
  !*** ./src/app/main/expenses/expenses.page.ts ***!
  \************************************************/
/*! exports provided: ExpensesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpensesPage", function() { return ExpensesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_expenses_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./expenses.page.html */ "w+Dn");
/* harmony import */ var _expenses_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expenses.page.css */ "BqqV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _modals_add_expense_add_expense_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modals/add-expense/add-expense.component */ "ge8o");
/* harmony import */ var _modals_edit_expense_edit_expense_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modals/edit-expense/edit-expense.component */ "N4hb");
/* harmony import */ var _cart_modals_filter_products_filter_products_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../cart/modals/filter-products/filter-products.component */ "O8PA");
/* harmony import */ var _modals_expense_view_expense_view_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modals/expense-view/expense-view.component */ "dIqv");
/* harmony import */ var _services_expense_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/expense.service */ "svBU");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../services/settings.service */ "6nr9");
/* harmony import */ var src_app_services_toaster_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/toaster.service */ "Ymxs");






// components




// services



let ExpensesPage = class ExpensesPage {
    constructor(settingsService, expenseService, toasterService, popoverController, actionSheetController, alertController) {
        this.settingsService = settingsService;
        this.expenseService = expenseService;
        this.toasterService = toasterService;
        this.popoverController = popoverController;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        // expenses for each date are grouped together and stored as objects.
        this.expenses = {};
        // unique dates are extracted from the incoming response and stored in expenseDates.
        // we iterate over expense dates to access the values stored in expenses object declared above.
        this.expenseDates = [];
        // for storing the total expenditure for each date.
        this.expensesDateTotal = {};
        // total expenditure
        this.total = 0;
        this.currentGroup = {
            id: '',
            name: ''
        };
        // stores filtered value for categories
        // default is all products
        this.selectedCategory = '';
        // stores filtered value for expense viewFilter
        this.selectedView = 'monthly';
        // viewFilter is set to date if selectedView is monthly and to month is selectedView is yearly
        this.viewFilter = 'date';
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // used for storing filter value of view expenses filter
        this.expensesArr = [];
        this.searchString = '';
    }
    ngOnInit() {
        // setting selectedMonth and selectedYear only one time when the page is originally loaded
        this.selectedMonth = new Date().getMonth();
        this.selectedYear = new Date().getFullYear();
    }
    ionViewDidEnter() {
        this.selectedDate = (`${this.selectedYear}-${this.selectedMonth + 1 > 10 ? (this.selectedMonth + 1) : '0' + (this.selectedMonth + 1)}`);
        // extracting the currentGroup name from the settings
        this.currentGroup.id = this.settingsService.settings.currentGroup;
        const groups = this.settingsService.settings.groups;
        if (groups) {
            groups.forEach((group) => {
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
        this.getExpenses();
    }
    ionViewDidLeave() {
        this.searchString = '';
    }
    // for getting expenses from the backend.
    getExpenses() {
        this.resetExpenseData();
        this.expenseService.getExpense(this.selectedMonth + 1, this.selectedYear, this.currentGroup.id, this.selectedView).
            pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe((expenses) => {
            // maintainig original copy of the data
            // used by searchbar for filtering data based of input characters
            this.allExpenses = [...expenses];
            expenses = this.applyCategoryFilter(expenses, this.selectedCategory);
            this.extractExpenses(expenses);
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        });
    }
    // called if the user wants to navigate to other months
    updateSelectMonth(event) {
        const date = new Date(event.detail.value);
        // condition to stop execution of code when the page is loaded for the first time
        if (this.selectedMonth !== date.getMonth() || this.selectedYear !== date.getFullYear()) {
            this.selectedMonth = date.getMonth();
            this.selectedYear = date.getFullYear();
            this.getExpenses();
        }
    }
    // core method for extracting and formatting expense data
    // data converted from array to object, sorted by date in ascending order
    extractExpenses(expenses) {
        this.resetExpenseData();
        // extracting the expenses list from the settings
        let expArr = this.settingsService.settings.expenses;
        if (!expArr) {
            expArr = [];
        }
        for (let exp of expArr) {
            const key = Object.keys(exp).toString();
            this.expensesArr.push({
                id: key,
                name: exp[key]
            });
        }
        if (this.selectedView === 'yearly') {
            this.viewFilter = 'month';
        }
        if (expenses.length > 0) {
            // first we extract the unique dates.
            for (let i = 0; i < expenses.length; i++) {
                let flag = false;
                for (let j = 0; j < this.expenseDates.length; j++) {
                    if (expenses[i].date[this.viewFilter] === this.expenseDates[j][this.viewFilter]) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    this.expenseDates.push(expenses[i].date);
                }
            }
            this.expenseDates.sort((exp1, exp2) => {
                return exp1[this.viewFilter] - exp2[this.viewFilter];
            });
            // extracting the expenses for each date and storing them in groups
            for (let date of this.expenseDates) {
                let tempArr = [];
                let cost = 0;
                for (let j = 0; j < expenses.length; j++) {
                    if (expenses[j].date[this.viewFilter] === date[this.viewFilter]) {
                        tempArr.push(expenses[j]);
                        cost += +expenses[j].cost; // calculating the total cost for each group
                    }
                }
                this.expensesDateTotal[date[this.viewFilter]] = cost;
                this.total += +cost; // calculating the total expenditure
                this.expenses[date[this.viewFilter]] = tempArr;
            }
        }
        else {
            this.expenses = {};
        }
    }
    // popovers and alert functions
    presentAddExpensePopover() {
        this.popoverController.create({
            component: _modals_add_expense_add_expense_component__WEBPACK_IMPORTED_MODULE_6__["AddExpenseComponent"],
            componentProps: {
                expenses: this.expensesArr,
                gid: this.currentGroup.id
            }
        }).then((popoverEl) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
        }).then((popoverResult) => {
            if (popoverResult.role === 'create') {
                this.allExpenses.push(popoverResult.data);
                this.extractExpenses([...this.allExpenses]);
            }
        });
    }
    presentExpenseActionSheet(expense) {
        this.actionSheetController.create({
            header: 'Options',
            buttons: [{
                    text: 'Cancel',
                    role: 'destructive',
                    icon: 'close-outline'
                }, {
                    text: 'Update',
                    icon: 'create-outline',
                    handler: () => {
                        this.popoverController.create({
                            component: _modals_edit_expense_edit_expense_component__WEBPACK_IMPORTED_MODULE_7__["EditExpenseComponent"],
                            componentProps: {
                                expense
                            }
                        }).then((popoverEl) => {
                            popoverEl.present();
                            return popoverEl.onDidDismiss();
                        }).then((popoverResult) => {
                            if (popoverResult.role === 'edit') {
                                // if the date is updated and the month and the year are same as selectedMonth and selectedYear
                                if (popoverResult.data.date.month === this.selectedMonth + 1 && popoverResult.data.date.year === this.selectedYear) {
                                    // extract all the entries except the one editted
                                    this.allExpenses = [...this.allExpenses].filter(exp => {
                                        if (exp._id !== popoverResult.data._id) {
                                            return true;
                                        }
                                    });
                                    // add the editted expense to the allExpenses
                                    this.allExpenses.push(popoverResult.data);
                                    // send for processing
                                    this.extractExpenses(this.allExpenses);
                                }
                                else {
                                    // simply remove the entry from allExpenses if either the month or year are different
                                    this.allExpenses = [...this.allExpenses].filter(exp => {
                                        if (exp._id !== popoverResult.data._id) {
                                            return true;
                                        }
                                    });
                                    this.extractExpenses(this.allExpenses);
                                }
                            }
                        });
                    }
                }, {
                    text: 'Delete',
                    icon: 'trash-outline',
                    handler: () => {
                        this.alertController.create({
                            header: 'Delete Expense',
                            buttons: [{
                                    text: 'Cancel',
                                    role: 'cancel'
                                }, {
                                    text: 'Delete',
                                    handler: () => {
                                        this.expenseService.deleteExpense(expense._id).subscribe(() => {
                                            this.allExpenses = [...this.allExpenses].filter(exp => {
                                                if (exp._id !== expense._id) {
                                                    return true;
                                                }
                                            });
                                            this.extractExpenses([...this.allExpenses]);
                                        }, (error) => {
                                            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                                        });
                                    }
                                }]
                        }).then((alertEl) => {
                            alertEl.present();
                        });
                    }
                }]
        }).then((actionSheeEl) => {
            actionSheeEl.present();
        });
    }
    presentCategoryPopover() {
        let categories = [{
                '': 'All Products'
            }];
        categories = categories.concat(this.settingsService.settings.categories);
        let otherExpenses = {
            others: 'Others'
        };
        categories.push(otherExpenses);
        this.popoverController.create({
            component: _cart_modals_filter_products_filter_products_component__WEBPACK_IMPORTED_MODULE_8__["FilterProductsComponent"],
            componentProps: {
                gid: this.currentGroup.id,
                categories,
                selectedCategory: this.selectedCategory
            }
        }).then((popoverEl) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
        }).then((popoverResult) => {
            if (popoverResult.role === 'filter') {
                this.selectedCategory = popoverResult.data.id;
                let tempArr = [...this.allExpenses];
                tempArr = this.applyCategoryFilter(tempArr, popoverResult.data.id);
                this.extractExpenses(tempArr);
            }
        });
    }
    presentViewFilterPopover() {
        this.popoverController.create({
            component: _modals_expense_view_expense_view_component__WEBPACK_IMPORTED_MODULE_9__["ExpenseViewComponent"],
            componentProps: {
                selectedView: this.selectedView
            }
        }).then((popoverEl) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
        }).then((popoverResult) => {
            if (popoverResult.role === 'filter') {
                this.selectedView = popoverResult.data;
                if (this.selectedView === 'yearly') {
                    this.viewFilter = 'month';
                }
                else {
                    this.viewFilter = 'date';
                }
                this.getExpenses();
            }
        });
    }
    // unitlity functions
    resetExpenseData() {
        this.expenses = {};
        this.expenseDates = [];
        this.expensesDateTotal = {};
        this.expensesArr = [];
        this.total = 0;
    }
    // for filering data from allExpenses based on searchString characters
    filterProductExpenses(searchStr) {
        // regex will remove special characters from the search string
        searchStr = searchStr.replace(/[^a-zA-Z]/g, '');
        if (searchStr !== '') {
            this.searchString = searchStr;
            let tempArr = [];
            let regExp = new RegExp(`^.*${searchStr}.*$`, 'i');
            for (let expense of this.allExpenses) {
                if (regExp.test(expense.name)) {
                    tempArr.push(expense);
                }
            }
            this.extractExpenses(tempArr);
        }
        if (searchStr === '') {
            this.extractExpenses(this.allExpenses);
        }
    }
    applyCategoryFilter(expenses, cid) {
        if (cid === '') {
            return expenses;
        }
        if (cid === 'others') {
            cid = null;
        }
        return expenses.filter((exp) => {
            if (exp.cid === cid) {
                return true;
            }
        });
    }
};
ExpensesPage.ctorParameters = () => [
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_11__["SettingsService"] },
    { type: _services_expense_service__WEBPACK_IMPORTED_MODULE_10__["ExpenseService"] },
    { type: src_app_services_toaster_service__WEBPACK_IMPORTED_MODULE_12__["ToasterService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] }
];
ExpensesPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-expenses',
        template: _raw_loader_expenses_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_expenses_page_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ExpensesPage);



/***/ }),

/***/ "BqqV":
/*!*************************************************!*\
  !*** ./src/app/main/expenses/expenses.page.css ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJleHBlbnNlcy5wYWdlLmNzcyJ9 */");

/***/ }),

/***/ "FAoo":
/*!**********************************************************!*\
  !*** ./src/app/main/expenses/expenses-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: ExpensesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpensesRoutingModule", function() { return ExpensesRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _expenses_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./expenses.page */ "9zHM");




const routes = [{
        path: '',
        component: _expenses_page__WEBPACK_IMPORTED_MODULE_3__["ExpensesPage"]
    }];
let ExpensesRoutingModule = class ExpensesRoutingModule {
};
ExpensesRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ExpensesRoutingModule);



/***/ }),

/***/ "K9ex":
/*!**************************************************!*\
  !*** ./src/app/main/expenses/expenses.module.ts ***!
  \**************************************************/
/*! exports provided: ExpensesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpensesModule", function() { return ExpensesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _expenses_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expenses.page */ "9zHM");
/* harmony import */ var _expenses_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./expenses-routing.module */ "FAoo");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _modals_add_expense_add_expense_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modals/add-expense/add-expense.component */ "ge8o");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _modals_edit_expense_edit_expense_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modals/edit-expense/edit-expense.component */ "N4hb");









let ExpensesModule = class ExpensesModule {
};
ExpensesModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_expenses_page__WEBPACK_IMPORTED_MODULE_2__["ExpensesPage"], _modals_add_expense_add_expense_component__WEBPACK_IMPORTED_MODULE_6__["AddExpenseComponent"], _modals_edit_expense_edit_expense_component__WEBPACK_IMPORTED_MODULE_8__["EditExpenseComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"], _expenses_routing_module__WEBPACK_IMPORTED_MODULE_3__["ExpensesRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"]]
    })
], ExpensesModule);



/***/ }),

/***/ "LtaL":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/expenses/modals/edit-expense/edit-expense.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar class=\"ion-text-center\">\n    <ion-title>Edit Expense</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-no-padding\">\n\n  <form #createExpenseForm=\"ngForm\" (ngSubmit)=\"onSubmit(createExpenseForm)\">\n    <ion-item>\n      <ion-label position=\"floating\">Date</ion-label>\n      <ion-datetime type=\"date\" [ngModel]=\"this.date\" name=\"date\"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Expense</ion-label>\n      <ion-input [value]=\"expense?.name | titlecase\" disabled></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Units</ion-label>\n      <ion-input type=\"number\" [ngModel]=\"expense?.units\" name=\"units\" disabled></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Total Cost <small>(Required)</small></ion-label>\n      <ion-input type=\"number\" [ngModel]=\"expense?.cost\" name=\"cost\" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-row class=\"ion-justify-content-center\">\n        <ion-button fill=\"clear\" (click)=\"onDismiss()\">Cancel</ion-button>\n        <ion-button type=\"submit\" fill=\"clear\" [disabled]=\"createExpenseForm.invalid\">Edit Expense</ion-button>\n      </ion-row>\n    </ion-item>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "N4hb":
/*!*****************************************************************************!*\
  !*** ./src/app/main/expenses/modals/edit-expense/edit-expense.component.ts ***!
  \*****************************************************************************/
/*! exports provided: EditExpenseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditExpenseComponent", function() { return EditExpenseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_edit_expense_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./edit-expense.component.html */ "LtaL");
/* harmony import */ var _edit_expense_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit-expense.component.scss */ "N99+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _services_expense_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../../services/expense.service */ "svBU");
/* harmony import */ var _services_toaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../../services/toaster.service */ "Ymxs");







let EditExpenseComponent = class EditExpenseComponent {
    constructor(popoverController, expensesService, toasterService) {
        this.popoverController = popoverController;
        this.expensesService = expensesService;
        this.toasterService = toasterService;
    }
    ngOnInit() {
        this.date = new Date(this.expense.date.year, this.expense.date.month - 1, this.expense.date.date).toISOString();
    }
    onDismiss() {
        this.popoverController.dismiss(null, 'cancel');
    }
    onSubmit(form) {
        const selectedDate = new Date(form.value.date);
        const update = {
            date: {
                date: selectedDate.getDate(),
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear()
            },
            cost: form.value.cost
        };
        this.expensesService.updateExpense(this.expense._id, update).subscribe(() => {
            this.expense.cost = update.cost;
            this.expense.date = update.date;
            this.popoverController.dismiss(this.expense, 'edit');
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        });
    }
};
EditExpenseComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] },
    { type: _services_expense_service__WEBPACK_IMPORTED_MODULE_5__["ExpenseService"] },
    { type: _services_toaster_service__WEBPACK_IMPORTED_MODULE_6__["ToasterService"] }
];
EditExpenseComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-edit-expense',
        template: _raw_loader_edit_expense_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_edit_expense_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], EditExpenseComponent);



/***/ }),

/***/ "N99+":
/*!*******************************************************************************!*\
  !*** ./src/app/main/expenses/modals/edit-expense/edit-expense.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlZGl0LWV4cGVuc2UuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "ge8o":
/*!***************************************************************************!*\
  !*** ./src/app/main/expenses/modals/add-expense/add-expense.component.ts ***!
  \***************************************************************************/
/*! exports provided: AddExpenseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddExpenseComponent", function() { return AddExpenseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_add_expense_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./add-expense.component.html */ "yxH4");
/* harmony import */ var _add_expense_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-expense.component.scss */ "9qSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_expense_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/expense.service */ "svBU");
/* harmony import */ var _services_toaster_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../../services/toaster.service */ "Ymxs");






// services


let AddExpenseComponent = class AddExpenseComponent {
    constructor(popoverController, expenseService, toasterService) {
        this.popoverController = popoverController;
        this.expenseService = expenseService;
        this.toasterService = toasterService;
        this.expenses = [];
        this.todaysDate = new Date().toISOString();
    }
    onDismiss() {
        this.popoverController.dismiss(null, 'cancel');
    }
    onSubmit(form) {
        const selectedDate = new Date(form.value.date);
        const expense = {
            name: form.value.expense.name,
            units: form.value.units > 0 ? form.value.units : 1,
            cost: form.value.cost,
            gid: this.gid,
            pid: form.value.expense.id,
            date: {
                date: selectedDate.getDate(),
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear()
            }
        };
        this.expenseService.addExpense(expense).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe((result) => {
            this.popoverController.dismiss(result.expense, 'create');
        }, (error) => {
            this.toasterService.presentToast('Failure!!', error, 200, 'danger');
        });
    }
};
AddExpenseComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] },
    { type: _services_expense_service__WEBPACK_IMPORTED_MODULE_6__["ExpenseService"] },
    { type: _services_toaster_service__WEBPACK_IMPORTED_MODULE_7__["ToasterService"] }
];
AddExpenseComponent.propDecorators = {
    expenses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    gid: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
AddExpenseComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-add-expense',
        template: _raw_loader_add_expense_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_add_expense_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AddExpenseComponent);



/***/ }),

/***/ "w+Dn":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/expenses/expenses.page.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title class=\"ion-padding-top\">\n      Expenses\n      <ion-label *ngIf=\"currentGroup?.name\"><small>({{currentGroup?.name|titlecase}})</small></ion-label>\n    </ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"presentCategoryPopover()\">\n        <ion-icon name=\"filter-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-grid>\n      <ion-row class=\"ion-justify-content-center\">\n        <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" size-lg=\"6\" size-xl=\"4\"\n          class=\"ion-margin-start ion-margin-end ion-no-padding\">\n          <ion-searchbar color=\"light\" showCancelButton=\"focus\" [(ngModel)]=\"searchString\" #searchStr\n            (ionInput)=\"filterProductExpenses(searchStr.value)\">\n          </ion-searchbar>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-buttons slot=\"primary\">\n      <ion-button (click)=\"presentViewFilterPopover()\">\n        <ion-icon name=\"funnel-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row class=\"ion-justify-content-center\">\n      <ion-col size=\"12\" size-sm=\"10\" size-md=\"8\" class=\"ion-text-center\">\n        <ion-toolbar size=\"12\" class=\"ion-text-center\" style=\"background-color: #1f1f1f;\">\n          <ion-datetime [value]=\"selectedDate\" [displayFormat]=\"viewFilter==='date'? 'MMMM YYYY' : 'YYYY'\"\n            (ionChange)=\"updateSelectMonth($event)\" style=\"width: 100%; padding-left: 50px;\"></ion-datetime>\n\n            <ion-buttons slot=\"primary\">\n            <ion-button (click)=\"presentAddExpensePopover()\">\n              <ion-icon name=\"add-outline\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n\n        <ion-list style=\"background-color: rgb(40, 41, 44);\">\n          <ion-card>\n            <ion-item style=\"font-size: 0.9rem;\">\n              <ion-label color=\"primary\">Total Expenditure</ion-label>\n              <ion-text color=\"success\">{{total}} /-</ion-text>\n            </ion-item>\n          </ion-card>\n          <ion-card *ngFor=\"let date of expenseDates\">\n            <ion-card-header>\n              <ion-card-subtitle>\n                {{months[date.month-1] | titlecase}}<span *ngIf=\"viewFilter==='date'\">, {{date.date}}</span>\n              </ion-card-subtitle>\n            </ion-card-header>\n            <ion-item style=\"font-size: 0.9rem;\">\n              <ion-label color=\"primary\">Product(s)</ion-label>\n              <ion-text color=\"primary\">Units | Cost</ion-text>\n            </ion-item>\n            <ion-item *ngFor=\"let expense of expenses[date[viewFilter]]\">\n              <ion-label><small>{{expense?.name | titlecase}} <span *ngIf=\"expense?.brand\">\n                    {{\"(\" + expense?.brand + \")\" | titlecase }}</span></small></ion-label>\n              <ion-text><small>{{expense?.units}} | {{expense?.cost}}</small></ion-text>\n              <ion-button fill=\"clear\" (click)=\"presentExpenseActionSheet(expense)\" class=\"ion-no-padding\">\n                <ion-icon name=\"ellipsis-vertical\" color=\"dark\"></ion-icon>\n              </ion-button>\n            </ion-item>\n\n            <ion-item style=\"font-size: 0.9rem;\">\n              <ion-label color=\"warning\">Total</ion-label>\n              <ion-text>{{expensesDateTotal[date[viewFilter]]}} /-</ion-text>\n            </ion-item>\n          </ion-card>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "yxH4":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main/expenses/modals/add-expense/add-expense.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar class=\"ion-text-center\">\n    <ion-title>Add Expense</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-no-padding\">\n\n  <form #createExpenseForm=\"ngForm\" (ngSubmit)=\"onSubmit(createExpenseForm)\">\n    <ion-item>\n      <ion-label position=\"floating\">Date</ion-label>\n      <ion-datetime type=\"date\" [ngModel]=\"todaysDate\" name=\"date\" required></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Expense</ion-label>\n      <ion-select ngModel name=\"expense\" required>\n        <ion-select-option [value]=\"expense\" *ngFor=\"let expense of expenses\">{{expense?.name | titlecase}}\n        </ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Units</ion-label>\n      <ion-input type=\"number\" ngModel=\"1\" name=\"units\" min=\"1\" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\">Total Cost</ion-label>\n      <ion-input type=\"number\" ngModel name=\"cost\" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-row class=\"ion-justify-content-center\">\n        <ion-button fill=\"clear\" (click)=\"onDismiss()\">Cancel</ion-button>\n        <ion-button type=\"submit\" fill=\"clear\" [disabled]=\"createExpenseForm.invalid\">Add Expense</ion-button>\n      </ion-row>\n    </ion-item>\n  </form>\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=expenses-expenses-module.js.map