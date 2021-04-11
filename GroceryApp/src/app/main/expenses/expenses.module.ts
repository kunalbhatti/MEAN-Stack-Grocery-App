import {
  NgModule
} from '@angular/core';
import {
  ExpensesPage
} from './expenses.page';
import {
  ExpensesRoutingModule
} from './expenses-routing.module';
import {
  CommonModule
} from '@angular/common';
import {
  IonicModule
} from '@ionic/angular';
import {
  AddExpenseComponent
} from './modals/add-expense/add-expense.component';
import {
  FormsModule
} from '@angular/forms';
import {
  EditExpenseComponent
} from './modals/edit-expense/edit-expense.component';

@NgModule({
  declarations: [ExpensesPage, AddExpenseComponent, EditExpenseComponent],
  imports: [CommonModule, IonicModule, ExpensesRoutingModule, FormsModule]
})
export class ExpensesModule {

}
