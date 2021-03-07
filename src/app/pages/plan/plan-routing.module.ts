import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanPage } from './plan.page';
import {PlanDetailsPage} from "./components/plan-details/plan-details";

const routes: Routes = [
  {
    path: '',
    component: PlanPage
  },
  { path: 'plan-details/:id', component: PlanDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanPageRoutingModule {}
