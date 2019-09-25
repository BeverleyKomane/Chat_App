import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { TabsPage } from './tabs/tabs.page';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
  
  { path: 'tabs',component: TabsPage, canActivate: [AuthGuard] , children:[
    { path: '', loadChildren: './main/main.module#MainPageModule' },
    { path: 'main', loadChildren: './main/main.module#MainPageModule',canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderPageModule' },
   
  ] },
];

//localhost/tabs


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
