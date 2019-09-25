import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploaderPage } from './uploader.page';
// import * as firebase from 'firebase/app';

const routes: Routes = [
  {
    path: '',
    component: UploaderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploaderPage]
})
export class UploaderPageModule {
  // $key: string;
  // file:File;
  // name:string;
  // url:string;
  // progress:number;
  // createdAt: Date = new Date();

}

