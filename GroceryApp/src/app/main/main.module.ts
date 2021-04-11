import {
  CommonModule
} from "@angular/common";
import {
  NgModule
} from "@angular/core";
import {
  FormsModule
} from "@angular/forms";
import {
  IonicModule
} from "@ionic/angular";

import {
  MainPage
} from "./main.page";

import {
  AddToInventoryComponent
} from "./cart/modals/add-to-inventory/add-to-inventory.component";
import {
  ExpenseViewComponent
} from "./expenses/modals/expense-view/expense-view.component";
import {
  FilterProductsComponent
} from "./cart/modals/filter-products/filter-products.component";
import {
  SortProductsComponent
} from "./cart/modals/sort-products/sort-products.component";
import {
  MainRoutingModule
} from "./main-routing.module";


@NgModule({
  declarations: [MainPage, AddToInventoryComponent, FilterProductsComponent, SortProductsComponent, ExpenseViewComponent],
  imports: [CommonModule, IonicModule, MainRoutingModule, FormsModule],
})
export class MainModule {

}
