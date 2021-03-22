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
  MainRoutingModule
} from "./main-routing.module";
import {
  MainPage
} from "./main.page";

@NgModule({
  declarations: [MainPage],
  imports: [CommonModule, IonicModule, MainRoutingModule],
})
export class MainModule {

}
