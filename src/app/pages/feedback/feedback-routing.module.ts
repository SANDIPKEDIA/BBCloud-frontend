import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackPage } from './feedback.page';
import { FeedbackDetailsPage  } from "./components/feedback-details/feedback-details";

const routes: Routes = [
  {
    path: '',
    component: FeedbackPage
  },
  { path: 'feedback-details/:id', component: FeedbackDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackPageRoutingModule {}
