import {
  CommonModule
} from "@angular/common";
import {
  NgModule
} from "@angular/core";
import {
  ReactiveFormsModule
} from "@angular/forms";
import {
  IonicModule
} from "@ionic/angular";
import {
  LoginRoutingModule
} from "./login-routing.module";
import {
  LoginPage
} from "./login.page";

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, LoginRoutingModule],
})
export class LoginModule {

}
