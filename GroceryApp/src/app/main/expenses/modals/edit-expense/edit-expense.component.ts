import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  PopoverController
} from '@ionic/angular';
import {
  ExpensesModel
} from 'src/app/models/expense.model';
import {
  ExpensesService
} from 'src/app/services/expenses.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent implements OnInit {

  expense: ExpensesModel;

  date: string;

  constructor(private popoverController: PopoverController,
    private expensesService: ExpensesService) {}

  ngOnInit() {
    this.date = new Date(this.expense.date.year, this.expense.date.month - 1, this.expense.date.date).toISOString();
  }


  onDismiss(): void {
    this.popoverController.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm): void {


    const selectedDate = new Date(form.value.date);

    const update: {
      date: {
        date: number,
        month: number,
        year: number
      },
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
      }, (error: {
        error: string
      }) => {
        console.log(error);
      }
    );

  }
}
