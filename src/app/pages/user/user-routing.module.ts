import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import {UserDetailsPage} from "./components/user-details/user-details";

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  { path: 'user-details/:id', component: UserDetailsPage },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
