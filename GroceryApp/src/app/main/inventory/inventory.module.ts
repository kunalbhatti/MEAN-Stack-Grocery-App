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
  InventoryPage
} from "./inventory.page";

import {
  InventoryRoutingModule
} from './inventory-routing.module';

@NgModule({
  declarations: [InventoryPage],
  imports: [CommonModule, IonicModule, InventoryRoutingModule]
})
export class InventoryModule {}
