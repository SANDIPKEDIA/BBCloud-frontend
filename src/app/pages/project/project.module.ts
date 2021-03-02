import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { ProjectPageRoutingModule } from './project-routing.module'; //change

import { ProjectPage } from './project.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditProjectPageModel } from "./model/project/add-edit-project.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [ProjectPage, AddEditProjectPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditProjectPageModel]
})
export class ProjectPageModule {}
