import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomertouchpointPage } from './customertouchpoint.page';

const routes: Routes = [
  {
    path: '',
    component: CustomertouchpointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomertouchpointPageRoutingModule {}
