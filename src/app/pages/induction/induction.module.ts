import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { InductionPageRoutingModule } from './induction-routing.module'; //change

import { InductionPage } from './induction.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditInductionPageModel } from "./model/induction/add-edit-induction.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InductionPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [InductionPage, AddEditInductionPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditInductionPageModel]
})
export class InductionPageModule {}
