import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { TicketPageRoutingModule } from './ticket-routing.module'; //change

import { TicketPage } from './ticket.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditTicketPageModel } from "./model/ticket/add-edit-ticket.page";
import {TicketDetailsPage} from "./components/ticket-details/ticket-details";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [TicketPage, AddEditTicketPageModel,TicketDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditTicketPageModel]
})
export class TicketPageModule {}
