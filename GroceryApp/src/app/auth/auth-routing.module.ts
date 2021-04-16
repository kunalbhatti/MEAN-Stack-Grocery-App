import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  AuthPage
} from './auth.page';

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: '',
  component: AuthPage,
  children: [{
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    }, {
      path: 'recover-password',
      loadChildren: () => import('./recover-password/recover-password.module').then(m => m.RecoverPasswordPageModule)
    }, {
      path: 'activate-account',
      loadChildren: () => import('./activate-account/activate-account.module').then(m => m.ActivateAccountPageModule)
    }
  ]
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AuthRoutingModule {

}
