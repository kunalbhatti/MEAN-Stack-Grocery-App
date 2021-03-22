import {
  NgModule
} from "@angular/core";
import {
  RouterModule,
  Routes
} from "@angular/router";
import {
  SettingsPage
} from "./settings.page";

const routes: Routes = [{
  path: '',
  component: SettingsPage,
  children: [{
    path: 'manage-app',
    children: [{
        path: '',
        loadChildren: () => import('./manage-app/manage-app.module').then(m => m.ManageAppPageModule)
      },
      {
        path: 'category/:category/:cid',
        loadChildren: () => import('./manage-app/category/category.module').then(m => m.CategoryModule)
      }
    ]
  }, {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  }, {
    path: '',
    redirectTo: 'manage-app',
    pathMatch: 'full'
  }]
}, ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {

}
