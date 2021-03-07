import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacancyPage } from './vacancy.page';
import {VacancyDetailsPage} from "./components/vacancy-details/vacancy-details";


const routes: Routes = [
  {
    path: '',
    component: VacancyPage
  },
  { path: 'vacancy-details/:id', component: VacancyDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyPageRoutingModule {}
