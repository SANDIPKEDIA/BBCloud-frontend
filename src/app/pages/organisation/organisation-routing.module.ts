import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganisationPage } from './organisation.page';
import {OrganisationDetailsPage} from "./component/organisation-details/organisation-details";
const routes: Routes = [
  {
    path: '',
    component: OrganisationPage
  },
  { path: 'organisation-details/:id', component: OrganisationDetailsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisationPageRoutingModule {}
