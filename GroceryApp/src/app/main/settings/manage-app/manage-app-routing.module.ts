import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAppPage } from './manage-app.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAppPageRoutingModule {}
