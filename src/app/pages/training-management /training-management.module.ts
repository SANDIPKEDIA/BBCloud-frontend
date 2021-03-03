import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MatNativeDateModule } from '@angular/material/core';
import { TrainingManagementPageRoutingModule } from './training-management-routing.module';
import { TrainingManagementPage } from './training-management.page';

import { AddEditFolderPageModel } from './model/folder/add-edit-folder.page';
import { TrainingPageModel } from './model/training/training.page';
import { TrainingListPageModel } from './model/training-list/training-list.page';
import { TrainingDetailPageModel } from './model/training-details/training-detail.page';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    TrainingManagementPageRoutingModule
  ],
  declarations: [TrainingManagementPage, TrainingPageModel, AddEditFolderPageModel, TrainingListPageModel, TrainingDetailPageModel],
  providers:[Camera,File, WebView,
    FilePath],
  entryComponents:[TrainingPageModel, AddEditFolderPageModel, TrainingListPageModel, TrainingDetailPageModel]
})
export class TrainingManagementPageModule {}
