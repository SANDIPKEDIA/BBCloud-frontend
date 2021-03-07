import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketPage } from './ticket.page';
import {TicketDetailsPage} from "./components/ticket-details/ticket-details";


const routes: Routes = [
  {
    path: '',
    component: TicketPage
  },
  
  { path: 'ticket-details/:id', component: TicketDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketPageRoutingModule {}
