import {
  CommonModule
} from '@angular/common';
import {
  NgModule
} from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  IonicModule
} from '@ionic/angular';
import {
  RegisterRoutingModule
} from './register-routing.module';
import {
  RegisterPage
} from './register.page';

@NgModule({
  declarations: [RegisterPage],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RegisterRoutingModule]
})
export class RegisterModule {

}
