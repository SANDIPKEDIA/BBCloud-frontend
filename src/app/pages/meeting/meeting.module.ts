import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { MeetingPageRoutingModule } from './meeting-routing.module'; //change

import { MeetingPage } from './meeting.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditMeetingPageModel } from "./model/meeting/add-edit-meeting.page";
import {MeetingDetailsPage} from "./components/meeting-details/meeting-details";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [MeetingPage, AddEditMeetingPageModel,MeetingDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditMeetingPageModel]
})
export class MeetingPageModule {}
