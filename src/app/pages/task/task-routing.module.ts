import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskPage } from './task.page';
import {TaskDetailsPage} from "./components/task-details/task-details";


const routes: Routes = [
  {
    path: '',
    component: TaskPage
  },
  { path: 'task-details/:id', component: TaskDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskPageRoutingModule {}
