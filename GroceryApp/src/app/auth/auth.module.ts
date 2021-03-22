import {
  CommonModule
} from "@angular/common";
import {
  NgModule
} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import {
  AuthRoutingModule
} from "./auth-routing.module";
import {
  AuthPage
} from "./auth.page";

@NgModule({
  declarations: [AuthPage],
  imports: [
    IonicModule,
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule {

}
