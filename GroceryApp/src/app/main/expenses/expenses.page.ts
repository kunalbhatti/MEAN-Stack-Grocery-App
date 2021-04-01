import {
  Component,
  OnInit
} from "@angular/core";
import {
  take
} from "rxjs/operators";
import {
  ExpensesService
} from "src/app/services/expenses.service";
import {
  SettingsService
} from "src/app/services/settings.service";

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.css']
})
export class ExpensesPage implements OnInit {

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

  constructor(private settingsService: SettingsService, private expensesService: ExpensesService) {}

  ngOnInit() {
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
  }

  ionViewDidEnter() {
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
    const today: Date = new Date();

    var date = new Date();

    this.expensesService.getExpense(this.selectedMonth + 1, this.selectedYear, this.currentGroup.id).pipe(take(1)).subscribe(expenses => {
      console.log(expenses);
    });

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

    this.expensesService.getExpense(this.selectedMonth + 1, this.selectedYear, this.currentGroup.id).pipe(take(1)).subscribe(expenses => {
      console.log(expenses);
    });
  }
}
