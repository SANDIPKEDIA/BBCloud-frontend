import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { TodoPageRoutingModule } from './todo-routing.module'; //change

import { TodoPage } from './todo.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditTodoPageModel } from "./model/todo/add-edit-todo.page";
import {TodoDetailsPage} from "./components/todo-details/todo-details";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [TodoPage, AddEditTodoPageModel,TodoDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditTodoPageModel]
})
export class TodoPageModule {}
