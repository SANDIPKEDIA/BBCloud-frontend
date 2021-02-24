import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';

import { EmployeePage } from './employee.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditEmployeePageModel } from "./model/employee/add-edit-employee.page";
import { EmployeePageRoutingModule } from './employee-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [EmployeePage, AddEditEmployeePageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditEmployeePageModel]
})
export class EmployeePageModule {}
