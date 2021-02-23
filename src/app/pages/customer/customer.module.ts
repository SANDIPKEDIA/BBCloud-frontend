import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { CustomerPageRoutingModule } from './customer-routing.module'; //change

import { CustomerPage } from './customer.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditCustomerPageModel } from "./model/customer/add-edit-customer.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [CustomerPage, AddEditCustomerPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditCustomerPageModel]
})
export class CustomerPageModule {}
