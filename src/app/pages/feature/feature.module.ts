import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { FeaturePageRoutingModule } from './feature-routing.module'; //change

import { FeaturePage } from './feature.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditFeaturePageModel } from "./model/feature/add-edit-feature.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [FeaturePage, AddEditFeaturePageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditFeaturePageModel]
})
export class FeaturePageModule {}
