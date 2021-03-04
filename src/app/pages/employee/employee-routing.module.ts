import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeePage } from './employee.page';
import { EmpDetailsPage  } from "./components/emp-details/emp-details";

const routes: Routes = [
  {
    path: '',
    component: EmployeePage
  },
  { path: 'emp-details/:id', component: EmpDetailsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule {}
