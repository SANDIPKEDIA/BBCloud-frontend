import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingPage } from './training.page';
import {TrainingDetailsPage} from "./components/training-details/training-details";


const routes: Routes = [
  {
    path: '',
    component: TrainingPage
  },
  { path: 'training-details/:id', component: TrainingDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPageRoutingModule {}
