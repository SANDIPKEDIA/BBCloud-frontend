import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InductionPage } from './induction.page';

const routes: Routes = [
  {
    path: '',
    component: InductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InductionPageRoutingModule {}
