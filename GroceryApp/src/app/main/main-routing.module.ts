import {
  NgModule
} from "@angular/core";
import {
  RouterModule,
  Routes
} from "@angular/router";

import {
  MainPage
} from "./main.page";

const routes: Routes = [{
  path: '',
  component: MainPage,
  children: [{
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  }, {
    path: 'expenses',
    loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule)
  }, {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
  }, {
    path: 'settings',
    children: [{
      path: '',
      loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    }]
  }, {
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full'
  }],
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {

}
