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
  SettingsRoutingModule
} from "./settings-routing.module";

import {
  SettingsPage
} from "./settings.page";

@NgModule({
  declarations: [SettingsPage],
  imports: [CommonModule, IonicModule, SettingsRoutingModule],
  exports: []
})
export class SettingsModule {

}
