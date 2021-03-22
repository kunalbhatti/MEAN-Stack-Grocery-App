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
  ConfirmDeleteComponent
} from "./modals/confirm-delete/confirm-delete.component";
import {
  CreateProductComponent
} from "./modals/create-product/create-product.component";

import {
  ManageAppPageRoutingModule
} from './manage-app-routing.module';

import {
  ManageAppPage
} from './manage-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAppPageRoutingModule
  ],
  declarations: [ManageAppPage, CreateProductComponent, ConfirmDeleteComponent]
})
export class ManageAppPageModule {}
