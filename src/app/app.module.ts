import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

// import { HttpClientModule } from '@angular/common/http'
import { TabsPage } from './tabs/tabs.page';

import {AngularFireStorageModule} from '@angular/fire/storage';

import { FormsModule } from "@angular/forms";

var Config = {
  apiKey: "AIzaSyCwRs94jT_GDa5YdbQShN3aBF0Dd9fASHE",
  authDomain: "chatapp-31384.firebaseapp.com",
  databaseURL: "https://chatapp-31384.firebaseio.com",
  projectId: "chatapp-31384",
  storageBucket: "chatapp-31384.appspot.com",
  messagingSenderId: "851180683618",
  appId: "1:851180683618:web:a84f2109246345b1"
};
@NgModule({
  declarations: [AppComponent,TabsPage],
  entryComponents: [],
  imports: [FormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(Config),AngularFirestoreModule.enablePersistence(), AngularFireAuthModule,
    AngularFireStorageModule,
 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
