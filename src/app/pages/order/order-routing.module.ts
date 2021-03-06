import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdDetailsPage } from '../order/components/order-details/order-details';

import { OrderPage } from './order.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  },
  { path: 'order-details/:id', component: OrdDetailsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule {}
