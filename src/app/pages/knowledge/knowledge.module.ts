import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { KnowledgeCenterPageRoutingModule } from './knowledge-routing.module'; //change

import { KnowledgeCenterPage } from './knowledge.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditKnowledgeCenterPageModel } from "./model/knowledge/add-edit-knowledge.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KnowledgeCenterPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [KnowledgeCenterPage, AddEditKnowledgeCenterPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditKnowledgeCenterPageModel]
})
export class KnowledgeCenterPageModule {}
