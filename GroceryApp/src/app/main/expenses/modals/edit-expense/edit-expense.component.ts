import {
  Component,
  OnInit,
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  PopoverController
} from '@ionic/angular';

import {
  ExpenseService
} from './../../../../services/expense.service';
import {
  ToasterService
} from './../../../../services/toaster.service';

import {
  ExpenseModel
} from './../../../../models/expense.model';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent implements OnInit {

  expense: ExpenseModel;

  date: string;

  constructor(private popoverController: PopoverController,
    private expensesService: ExpenseService,
    private toasterService: ToasterService) {}

  ngOnInit() {
    this.date = new Date(this.expense.date.year, this.expense.date.month - 1, this.expense.date.date).toISOString();
  }


  onDismiss(): void {
    this.popoverController.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm): void {

    const selectedDate: Date = new Date(form.value.date);

    const update: {
      date: ExpenseModel['date'],
      cost: number
    } = {
      date: {
        date: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear()
      },
      cost: form.value.cost
    }

    this.expensesService.updateExpense(this.expense._id, update).subscribe(
      () => {
        this.expense.cost = update.cost;
        this.expense.date = update.date;
        this.popoverController.dismiss(this.expense, 'edit');
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
      }
    );

  }
}
