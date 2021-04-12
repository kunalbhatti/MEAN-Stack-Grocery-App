import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  PopoverController
} from '@ionic/angular';
import {
  take
} from 'rxjs/operators';

// components
import {
  AddExpenseComponent
} from './modals/add-expense/add-expense.component';
import {
  EditExpenseComponent
} from './modals/edit-expense/edit-expense.component';
import {
  FilterProductsComponent
} from '../cart/modals/filter-products/filter-products.component';
import {
  ExpenseViewComponent
} from './modals/expense-view/expense-view.component';

// services
import {
  ExpenseService
} from '../../services/expense.service';
import {
  SettingsService
} from './../../services/settings.service';
import {
  ToasterService
} from 'src/app/services/toaster.service';

// models
import {
  ExpenseModel
} from './../../models/expense.model';
import {
  SettingsModel
} from 'src/app/models/settings.model';

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.css']
})
export class ExpensesPage implements OnInit {

  allExpenses: ExpenseModel[];
  filtered: any[];

  // expenses for each date are grouped together and stored as objects.
  expenses: {
    [date: number]: ExpenseModel[]
  } = {};

  // unique dates are extracted from the incoming response and stored in expenseDates.
  // we iterate over expense dates to access the values stored in expenses object declared above.
  expenseDates: ExpenseModel['date'][] = [];

  // for storing the total expenditure for each date.
  expensesDateTotal: {
    [date: number]: number
  } = {};

  // total expenditure
  total: number = 0;

  currentGroup: {
    id: string,
    name: string
  } = {
    id: '',
    name: ''
  };

  // stores filtered value for categories
  // default is all products
  selectedCategory: string = '';

  // stores filtered value for expense viewFilter
  selectedView: string = 'monthly';

  // viewFilter is set to date if selectedView is monthly and to month is selectedView is yearly
  viewFilter: string = 'date';

  selectedMonth: number;
  selectedYear: number;

  // current date
  selectedDate: string;

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // used for storing filter value of view expenses filter
  expensesArr: {
    name: string,
    id: string
  } [] = [];

  searchString: string = '';

  constructor(private settingsService: SettingsService,
    private expenseService: ExpenseService,
    private toasterService: ToasterService,
    private popoverController: PopoverController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController) {}

  ngOnInit(): void {
    // setting selectedMonth and selectedYear only one time when the page is originally loaded
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
  }

  ionViewDidEnter(): void {
    this.selectedDate = (`${this.selectedYear}-${this.selectedMonth + 1 > 10 ? (this.selectedMonth + 1) : '0' + (this.selectedMonth + 1)}`);

    // extracting the currentGroup name from the settings
    this.currentGroup.id = this.settingsService.settings.currentGroup;

    const groups: SettingsModel['groups'] = this.settingsService.settings.groups;

    if (groups) {
      groups.forEach((group: {
        [id: string]: string;
      }) => {
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
  getExpenses(): void {
    this.resetExpenseData();

    this.expenseService.getExpense(this.selectedMonth + 1, this.selectedYear, this.currentGroup.id, this.selectedCategory, this.selectedView).
    pipe(take(1)).subscribe((expenses: ExpenseModel[]) => {
      // maintainig original copy of the data
      // used by searchbar for filtering data based of input characters
      this.allExpenses = [...expenses];
      this.extractExpenses(expenses);
    }, (error: string) => {
      this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
    });
  }

  // called if the user wants to navigate to other months
  updateSelectMonth(event: CustomEvent): void {
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
  extractExpenses(expenses: ExpenseModel[]): void {
    this.resetExpenseData();

    // extracting the expenses list from the settings
    let expArr: SettingsModel['expenses'] = this.settingsService.settings.expenses;

    if (!expArr) {
      expArr = [];
    }

    for (let exp of expArr) {
      const key = Object.keys(exp).toString();
      this.expensesArr.push({
        id: key,
        name: exp[key]
      })
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

      this.expenseDates.sort((exp1: ExpenseModel['date'], exp2: ExpenseModel['date']) => {
        return exp1[this.viewFilter] - exp2[this.viewFilter];
      })

      // extracting the expenses for each date and storing them in groups
      for (let date of this.expenseDates) {
        let tempArr: ExpenseModel[] = [];

        let cost: number = 0;

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
    } else {
      this.expenses = {};
    }
  }


  // popovers and alert functions

  presentAddExpensePopover(): void {
    this.popoverController.create({
      component: AddExpenseComponent,
      componentProps: {
        expenses: this.expensesArr,
        gid: this.currentGroup.id
      }
    }).then(
      (popoverEl: HTMLIonPopoverElement) => {
        popoverEl.present();
        return popoverEl.onDidDismiss();
      }
    ).then((popoverResult: {
      role: string,
      data: ExpenseModel
    }) => {
      if (popoverResult.role === 'create') {
        this.allExpenses.push(popoverResult.data);
        this.extractExpenses([...this.allExpenses]);
      }
    })
  }

  presentExpenseActionSheet(expense: ExpenseModel): void {
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
            component: EditExpenseComponent,
            componentProps: {
              expense
            }
          }).then((popoverEl: HTMLIonPopoverElement) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
          }).then((popoverResult: {
            data: ExpenseModel,
            role: string
          }) => {
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
              } else {
                // simply remove the entry from allExpenses if either the month or year are different
                this.allExpenses = [...this.allExpenses].filter(exp => {
                  if (exp._id !== popoverResult.data._id) {
                    return true;
                  }
                })
                this.extractExpenses(this.allExpenses);
              }
            }
          })
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
                this.expenseService.deleteExpense(expense._id).subscribe(
                  () => {
                    this.allExpenses = [...this.allExpenses].filter(exp => {
                      if (exp._id !== expense._id) {
                        return true;
                      }
                    })
                    this.extractExpenses([...this.allExpenses]);
                  }, (error: string) => {
                    this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                  }
                );
              }
            }]
          }).then((alertEl: HTMLIonAlertElement) => {
            alertEl.present();
          });
        }
      }]
    }).then((actionSheeEl: HTMLIonActionSheetElement) => {
      actionSheeEl.present();
    })
  }

  presentCategoryPopover(): void {
    let categories: SettingsModel['expenses'] = [{
      '': 'All Products'
    }];

    categories = categories.concat(this.settingsService.settings.categories);

    this.popoverController.create({
      component: FilterProductsComponent,
      componentProps: {
        gid: this.currentGroup.id,
        categories,
        selectedCategory: this.selectedCategory
      }
    }).then((popoverEl: HTMLIonPopoverElement) => {
      popoverEl.present();
      return popoverEl.onDidDismiss();
    }).then((popoverResult: {
      data: string,
      role: string
    }) => {
      if (popoverResult.role === 'filter') {
        this.selectedCategory = popoverResult.data;
        this.getExpenses();
      }
    });
  }

  presentViewFilterPopover(): void {
    this.popoverController.create({
      component: ExpenseViewComponent,
      componentProps: {
        selectedView: this.selectedView
      }
    }).then((popoverEl: HTMLIonPopoverElement) => {
      popoverEl.present();
      return popoverEl.onDidDismiss();
    }).then((popoverResult: {
      data: string,
      role: string
    }) => {
      if (popoverResult.role === 'filter') {
        this.selectedView = popoverResult.data;
        if (this.selectedView === 'yearly') {
          this.viewFilter = 'month';
        } else {
          this.viewFilter = 'date'
        }
        this.getExpenses();
      }

    })
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
  filterProductExpenses(searchStr: string): void {
    // regex will remove special characters from the search string
    searchStr = searchStr.replace(/[^a-zA-Z]/g, '');

    if (searchStr !== '') {
      this.searchString = searchStr;
      let tempArr = [];

      let regExp: RegExp = new RegExp(`^.*${searchStr}.*$`, 'i');

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
}
