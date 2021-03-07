import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { VacancyPageRoutingModule } from './vacancy-routing.module'; //change

import { VacancyPage } from './vacancy.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditVacancyPageModel } from "./model/vacancy/add-edit-vacancy.page";
import {VacancyDetailsPage} from "./components/vacancy-details/vacancy-details";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacancyPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [VacancyPage, AddEditVacancyPageModel,VacancyDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditVacancyPageModel]
})
export class VacancyPageModule {}
