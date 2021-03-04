import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerPage } from './customer.page';
import {CusDetailsPage} from "./components/cus-details/cus-details";

const routes: Routes = [
  {
    path: '',
    component: CustomerPage
  },
  { path: 'cusdetails/:id', component: CusDetailsPage },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPageRoutingModule {}
