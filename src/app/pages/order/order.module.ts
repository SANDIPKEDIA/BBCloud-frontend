import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { OrderPageRoutingModule } from './order-routing.module'; //change

import { OrderPage } from './order.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditOrderPageModel } from "./model/order/add-edit-order.page";
import { OrderDetailsPage } from '../orders/components/order-details/order-details';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [OrderPage, AddEditOrderPageModel,OrderDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditOrderPageModel]
})
export class OrderPageModule {}
