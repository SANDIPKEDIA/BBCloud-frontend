import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { PlanPageRoutingModule } from './plan-routing.module'; //change

import { PlanPage } from './plan.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditPlanPageModel } from "./model/plan/add-edit-plan.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [PlanPage, AddEditPlanPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditPlanPageModel]
})
export class PlanPageModule {}