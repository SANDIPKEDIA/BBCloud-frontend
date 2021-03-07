import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { TrainingPageRoutingModule } from './training-routing.module'; //change

import { TrainingPage } from './training.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditTrainingPageModel } from "./model/training/add-edit-training.page";
import {TrainingDetailsPage} from "./components/training-details/training-details";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [TrainingPage, AddEditTrainingPageModel,TrainingDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditTrainingPageModel]
})
export class TrainingPageModule {}
