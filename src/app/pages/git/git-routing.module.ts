import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GitPage } from './git.page';
import { GitDetailsPage  } from "./components/git-details/git-details";

const routes: Routes = [
  {
    path: '',
    component: GitPage
  },
  { path: 'git-details/:id', component: GitDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GitPageRoutingModule {}
