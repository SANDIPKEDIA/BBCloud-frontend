import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoPage } from './todo.page';
import {TodoDetailsPage} from "./components/todo-details/todo-details";


const routes: Routes = [
  {
    path: '',
    component: TodoPage
  },
  { path: 'todo-details/:id', component: TodoDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoPageRoutingModule {}
