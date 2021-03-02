import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { WorkPageRoutingModule } from './work-routing.module'; //change

import { WorkPage } from './work.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditWorkPageModel } from "./model/work/add-edit-work.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [WorkPage, AddEditWorkPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditWorkPageModel]
})
export class WorkPageModule {}
