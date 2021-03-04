import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomertouchpointPage } from './customertouchpoint.page';
import { CusTDetailsPage  } from "./components/custouchpoint-details/custouchpoint-details";

const routes: Routes = [
  {
    path: '',
    component: CustomertouchpointPage
  },

  { path: 'custouchpointdetails/:id', component: CusTDetailsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomertouchpointPageRoutingModule {}
