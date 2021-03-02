import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { OrganisationPageRoutingModule } from './organisation-routing.module'; //change

import { OrganisationPage } from './organisation.page';
import { AccountService } from '../../providers/account.service';
import { FinanceService } from '../../providers/finance.service';
import { AddEditOrganisationPageModel } from "./model/organisation/add-edit-organisation.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganisationPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations: [OrganisationPage, AddEditOrganisationPageModel],
  providers:[AccountService, FinanceService],
  entryComponents:[AddEditOrganisationPageModel]
})
export class OrganisationPageModule {}
