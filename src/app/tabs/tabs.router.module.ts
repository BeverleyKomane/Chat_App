import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path:'',
        component: TabsPage, 
        children:[ { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'main', loadChildren: '../main/main.module#MainPageModule' },
        ]
    } 
    ];

    @NgModule({
        imports: [ RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class TabsRoutingModule { }
      