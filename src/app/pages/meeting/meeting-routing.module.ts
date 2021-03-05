import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingPage } from './meeting.page';
import {MeetingDetailsPage} from "./components/meeting-details/meeting-details";




const routes: Routes = [
  {
    path: '',
    component: MeetingPage
  },
  { path: 'meeting-details/:id', component: MeetingDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingPageRoutingModule {}
