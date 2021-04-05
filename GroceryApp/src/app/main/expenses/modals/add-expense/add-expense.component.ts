import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  PopoverController
} from '@ionic/angular';
import {
  ExpensesModel
} from './../../../../models/expense.model';
import {
  ExpensesService
} from './../../../../services/expenses.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  @Input() expenses: {
    id: string,
    name: string
  } [] = [];
  @Input() gid: string;

  todaysDate: string = new Date().toISOString();

  constructor(private popoverController: PopoverController,
    private expensesService: ExpensesService) {}

  ngOnInit() {}

  onDismiss(): void {
    this.popoverController.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm): void {

    const selectedDate = new Date(form.value.date);

    const expense: ExpensesModel = {
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

    this.expensesService.addExpense(expense).subscribe((result: {expense: ExpensesModel}) => {
      this.popoverController.dismiss(result.expense, 'create');
    });

  }
}
