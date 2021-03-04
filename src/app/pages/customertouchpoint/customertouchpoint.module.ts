import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { CustomertouchpointPageRoutingModule } from './customertouchpoint-routing.module'; //change

import { CustomertouchpointPage } from './customertouchpoint.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditCustomertouchpointPageModel } from "./model/customertouchpoint/add-edit-customertouchpoint.page";
import { CusTDetailsPage  } from "./components/custouchpoint-details/custouchpoint-details";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomertouchpointPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [CustomertouchpointPage, AddEditCustomertouchpointPageModel,CusTDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditCustomertouchpointPageModel]
})
export class CustomertouchpointPageModule {}
