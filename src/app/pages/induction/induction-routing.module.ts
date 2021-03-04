import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InductionPage } from './induction.page';
import { InductionDetailsPage  } from "./components/induction-details/induction-details";


const routes: Routes = [
  {
    path: '',
    component: InductionPage
  },  { path: 'induction-details/:id', component: InductionDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InductionPageRoutingModule {}
