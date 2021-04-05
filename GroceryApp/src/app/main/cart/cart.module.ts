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
  CartRoutingModule
} from "./cart-routing.module";
import {
  CartPage
} from "./cart.page";
import {
  AddToInventoryComponent
} from "./modals/add-to-inventory/add-to-inventory.component";

@NgModule({
  declarations: [CartPage, AddToInventoryComponent],
  imports: [CommonModule, IonicModule, CartRoutingModule, FormsModule]
})
export class CartModule {

}
