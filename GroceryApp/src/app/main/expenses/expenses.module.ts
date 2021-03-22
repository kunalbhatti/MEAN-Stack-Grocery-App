import {
  NgModule
} from "@angular/core";
import {
  ExpensesPage
} from "./expenses.page";
import {
  ExpensesRoutingModule
} from './expenses-routing.module';
import {
  CommonModule
} from "@angular/common";
import {
  IonicModule
} from "@ionic/angular";

@NgModule({
  declarations: [ExpensesPage],
  imports: [CommonModule, IonicModule, ExpensesRoutingModule]
})
export class ExpensesModule {

}
