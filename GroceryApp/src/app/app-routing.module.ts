import {
  NgModule
} from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';
import {
  AppGuard
} from './guards/app.guard';
import {
  AuthGuard
} from './guards/auth.guard';

const routes: Routes = [{
  path: '',
  redirectTo: 'auth',
  pathMatch: 'full'
}, {
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  canActivate: [AuthGuard]
}, {
  path: 'app',
  loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  canLoad: [AppGuard]
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
