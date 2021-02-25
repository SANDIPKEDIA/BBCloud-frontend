import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';

import { DepartmentPage } from './department.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditDepartmentPageModel } from "./model/department/add-edit-department.page";
import { DepartmentPageRoutingModule } from './department-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [DepartmentPage, AddEditDepartmentPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditDepartmentPageModel]
})
export class DepartmentPageModule {}
