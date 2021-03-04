import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnowledgeCenterPage } from './knowledge.page';
import { KnowledgeDetailsPage  } from "./components/knowledge-details/knowledge-details";

const routes: Routes = [
  {
    path: '',
    component: KnowledgeCenterPage
  },

  { path: 'knowledge-details/:id', component: KnowledgeDetailsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnowledgeCenterPageRoutingModule {}
