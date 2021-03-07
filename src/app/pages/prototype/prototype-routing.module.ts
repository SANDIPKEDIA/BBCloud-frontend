import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrototypePage } from './prototype.page';
import {PrototypeDetailsPage} from "./components/prototype-details/prototype-details";


const routes: Routes = [
  {
    path: '',
    component: PrototypePage
  },
  { path: 'prototype-details/:id', component: PrototypeDetailsPage },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrototypePageRoutingModule {}
