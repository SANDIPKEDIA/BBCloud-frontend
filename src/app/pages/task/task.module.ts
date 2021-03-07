import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';

import { TaskPage } from './task.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditTaskPageModel } from "./model/task/add-edit-task.page";
import { TaskPageRoutingModule } from './task-routing.module';
import {TaskDetailsPage} from "./components/task-details/task-details";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [TaskPage, AddEditTaskPageModel,TaskDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditTaskPageModel]
})
export class TaskPageModule {}
