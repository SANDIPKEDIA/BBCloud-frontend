import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { GitPageRoutingModule } from './git-routing.module'; //change

import { GitPage } from './git.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditGitPageModel } from "./model/git/add-edit-git.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GitPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [GitPage, AddEditGitPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditGitPageModel]
})
export class GitPageModule {}
