import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { PackagePageRoutingModule } from './package-routing.module'; //change

import { PackagePage } from './package.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditPackagePageModel } from "./model/package/add-edit-package.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackagePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [PackagePage, AddEditPackagePageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditPackagePageModel]
})
export class PackagePageModule {}
