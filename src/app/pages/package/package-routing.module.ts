import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackagePage } from './package.page';
import {PackageDetailsPage} from "./components/package-details/package-details";


const routes: Routes = [
  {
    path: '',
    component: PackagePage
  },
  { path: 'package-details/:id', component: PackageDetailsPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagePageRoutingModule {}
