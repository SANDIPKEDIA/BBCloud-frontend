import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingManagementPage } from './training-management.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingManagementPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingManagementPageRoutingModule {}
