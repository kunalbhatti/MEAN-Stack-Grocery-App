import {
  Component,
  OnInit
} from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  PopoverController
} from "@ionic/angular";
import {
  take
} from "rxjs/operators";
import {
  ExpensesModel
} from "./../../models/expense.model";
import {
  ExpensesService
} from "./../../services/expenses.service";
import {
  SettingsService
} from "./../../services/settings.service";
import {
  AddExpenseComponent
} from "./modals/add-expense/add-expense.component";
import {
  EditExpenseComponent
} from "./modals/edit-expense/edit-expense.component";

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.css']
})
export class ExpensesPage implements OnInit {

  allExpenses: ExpensesModel[];

  expenses: {
    [date: number]: ExpensesModel[]
  } = {};

  expenseDates: ExpensesModel['date'][] = [];

  expensesDateTotal: {
    [date: number]: number
  } = {};

  total: number = 0;

  currentGroup: {
    id: string,
    name: string
  } = {
    id: '',
    name: ''
  };

  selectedMonth: number;
  selectedYear: number;

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  expensesArr: {
    name: string,
    id: string
  } [] = [];

  constructor(private settingsService: SettingsService,
    private expensesService: ExpensesService,
    private popoverController: PopoverController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();

    this.currentGroup.id = this.settingsService.settings.currentGroup;

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

    this.expensesService.getExpense(this.selectedMonth + 1, this.selectedYear, this.currentGroup.id).pipe(take(1)).subscribe((expenses: ExpensesModel[]) => {
      this.allExpenses = expenses;
      this.extractExpenses(expenses);
    });

    let expArr = this.settingsService.settings.expenses;
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

  }

  ionViewDidLeave() {
    this.expenses = {};
    this.expenseDates = [];
    this.expensesDateTotal = {};
    this.expensesArr = [];
    this.total = 0;
  }

  updateSelectMonth(count: number) {
    this.selectedMonth += count;

    if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear -= 1;
    }

    if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear += 1;
    }

    this.expensesService.getExpense(this.selectedMonth + 1, this.selectedYear, this.currentGroup.id).pipe(take(1)).subscribe((expenses: ExpensesModel[]) => {
      this.allExpenses = expenses;
      this.extractExpenses(this.allExpenses);
    });
  }

  extractExpenses(expenses: ExpensesModel[]) {
    this.expenseDates = [];
    this.expensesDateTotal = {};
    this.total = 0;

    if (expenses.length > 0) {
      let j = 0;

      // code to extract unique elements from the expenes array
      this.expenseDates.push(expenses[j].date);

      for (let i = 1; i < expenses.length; i++) {
        let temp = expenses[i].date;
        let flag = false;
        for (let j = 0; j < expenses.length; j++) {
          if(expenses[j].date === temp) {
            flag = true;
          }
        }
      }

      j = 0;

      for (let date of this.expenseDates) {
        let tempArr: ExpensesModel[] = [];

        let cost: number = 0;

        for (j; j < expenses.length; j++) {
          if (expenses[j].date.date === date.date) {
            tempArr.push(expenses[j]);
            cost += +expenses[j].cost;
          } else {
            break;
          }
        }

        this.expensesDateTotal[date.date] = cost;
        this.total += +cost;
        this.expenses[date.date] = tempArr;
        tempArr = [];
      }
    } else {
      this.expenses = {};
    }
  }

  presentExpenseAlert() {
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
      data: ExpensesModel
    }) => {
      if (popoverResult.role === 'create') {
        this.allExpenses.push(popoverResult.data);
        this.extractExpenses([...this.allExpenses]);
      }
    })
  }

  presentExpenseActionSheet(expense: ExpensesModel, index: number) {
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
              type: 'edit',
              expense
            }
          }).then((popoverEl: HTMLIonPopoverElement) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
          }).then((popoverResult: {
            data: ExpensesModel,
            role: string
          }) => {
            if (popoverResult.role === 'edit') {
              if (popoverResult.data.date.month === this.selectedMonth + 1 && popoverResult.data.date.year === this.selectedYear) {
                this.allExpenses = [...this.allExpenses].filter(exp => {
                  if (exp._id !== popoverResult.data._id) {
                    return true;
                  }
                });
                this.allExpenses.push(popoverResult.data);
                this.extractExpenses(this.allExpenses);
              } else {
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
                this.expensesService.deleteExpense(expense._id).subscribe(
                  () => {
                    this.allExpenses = [...this.allExpenses].filter(exp => {
                      if (exp._id !== expense._id) {
                        return true;
                      }
                    })
                    this.extractExpenses([...this.allExpenses]);
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
}
