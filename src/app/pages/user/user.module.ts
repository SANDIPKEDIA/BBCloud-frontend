import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { UserPageRoutingModule } from './user-routing.module'; //change

import { UserPage } from './user.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditUserPageModel } from "./model/user/add-edit-user.page";
import {UserDetailsPage} from "./components/user-details/user-details";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [UserPage, AddEditUserPageModel,UserDetailsPage],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditUserPageModel]
})
export class UserPageModule {}
