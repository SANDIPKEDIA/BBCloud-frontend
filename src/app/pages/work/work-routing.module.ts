import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkPage } from './work.page';
import {WorkDetailsPage} from "./components/work-details/work-details";


const routes: Routes = [
  {
    path: '',
    component: WorkPage
  },
  { path: 'work-details/:id', component: WorkDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkPageRoutingModule {}
