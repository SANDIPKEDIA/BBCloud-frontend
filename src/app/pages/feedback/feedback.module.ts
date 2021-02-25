import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';

import { FeedbackPage } from './feedback.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditFeedbackPageModel } from "./model/feedback/add-edit-feedback.page";
import { FeedbackPageRoutingModule } from './feedback-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [FeedbackPage, AddEditFeedbackPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditFeedbackPageModel]
})
export class FeedbackPageModule {}
