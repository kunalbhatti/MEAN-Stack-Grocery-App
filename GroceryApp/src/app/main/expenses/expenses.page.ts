import {
  Component,
  OnInit
} from "@angular/core";
import {
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

  expenseDates: number[] = [];

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
  }[] = [];

  constructor(private settingsService: SettingsService,
    private expensesService: ExpensesService,
    private popoverController: PopoverController) {}

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

    const expArr = this.settingsService.settings.expenses;
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
      this.extractExpenses(expenses);
    });
  }

  extractExpenses(expenses: ExpensesModel[]) {
    this.expenseDates = [];
    this.expensesDateTotal = {};
    this.total = 0;

    if (expenses.length > 0) {

      let j = 0;
      this.expenseDates.push(expenses[j].date.date);
      for (let i = 1; i < expenses.length; i++) {
        if (expenses[i].date.date !== this.expenseDates[j]) {
          this.expenseDates.push(expenses[i].date.date);
          j++;
        }
      }

      j = 0;

      for (let date of this.expenseDates) {
        let tempArr: ExpensesModel[] = [];

        let cost: number = 0;

        for (j; j < expenses.length; j++) {
          if (expenses[j].date.date === date) {
            tempArr.push(expenses[j]);
            cost += +expenses[j].cost * +expenses[j].units;
          } else {
            break;
          }
        }
        this.expensesDateTotal[date] = cost;
        this.total += +cost;
        this.expenses[date] = tempArr;
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
      if(popoverResult.role === 'create') {
        this.allExpenses.push(popoverResult.data);
        this.extractExpenses([...this.allExpenses]);
      }
    })
  }
}
