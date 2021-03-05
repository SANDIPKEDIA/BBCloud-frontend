import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketingPage } from './marketing.page';
import {MarketingDetailsPage} from "./components/marketing-details/marketing-details";


const routes: Routes = [
  {
    path: '',
    component: MarketingPage
  },
  { path: 'marketing-details/:id', component: MarketingDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketingPageRoutingModule {}
