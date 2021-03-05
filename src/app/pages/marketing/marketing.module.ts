import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { MarketingPageRoutingModule } from './marketing-routing.module'; //change

import { MarketingPage } from './marketing.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditMarketingPageModel } from "./model/marketing/add-edit-marketing.page";
import {MarketingDetailsPage} from "./components/marketing-details/marketing-details";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketingPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [MarketingPage, AddEditMarketingPageModel,MarketingDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditMarketingPageModel]
})
export class MarketingPageModule {}
