import {
  Component,
  Input
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  PopoverController
} from '@ionic/angular';
import {
  take
} from 'rxjs/operators';

// services
import {
  ExpenseService
} from '../../../../services/expense.service';
import {
  ToasterService
} from './../../../../services/toaster.service';

// models
import {
  SettingsModel
} from './../../../../models/settings.model';
import {
  ExpenseModel
} from './../../../../models/expense.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent {

  @Input() expenses: SettingsModel['expenses'] = [];
  @Input() gid: string;

  todaysDate: string = new Date().toISOString();

  constructor(private popoverController: PopoverController,
    private expenseService: ExpenseService,
    private toasterService: ToasterService) {}

  onDismiss(): void {
    this.popoverController.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm): void {

    const selectedDate: Date = new Date(form.value.date);

    const expense: ExpenseModel = {
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

    this.expenseService.addExpense(expense).pipe(take(1)).subscribe((result: {
      expense: ExpenseModel
    }) => {
      this.popoverController.dismiss(result.expense, 'create');
    }, (error: string) => {
      this.toasterService.presentToast('Failure!!', error, 200, 'danger');
    });

  }
}
