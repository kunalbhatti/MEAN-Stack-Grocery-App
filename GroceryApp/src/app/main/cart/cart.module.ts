import {
  CommonModule
} from "@angular/common";
import {
  NgModule
} from "@angular/core";
import {
  IonicModule
} from "@ionic/angular";
import {
  CartRoutingModule
} from "./cart-routing.module";
import {
  CartPage
} from "./cart.page";

@NgModule({
  declarations: [CartPage],
  imports: [CommonModule, IonicModule, CartRoutingModule]
})
export class CartModule {

}
