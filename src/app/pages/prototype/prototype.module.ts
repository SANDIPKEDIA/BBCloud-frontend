import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { PrototypePageRoutingModule } from './prototype-routing.module';

import { PrototypePage } from './prototype.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditPrototypePageModel } from "./model/prototype/add-edit-prototype.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrototypePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [PrototypePage, AddEditPrototypePageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditPrototypePageModel]
})
export class PrototypePageModule {}
