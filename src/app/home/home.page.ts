import { Component } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
email: string;
pwd:string;

  constructor(public fs:AngularFirestore,public af:AngularFireAuth,public nav:NavController,) {

  }
login() {
  this.af.auth.signInWithEmailAndPassword(this.email,this.pwd).then(()=>{
    this.nav.navigateRoot('tabs/uploader')
  }).catch(error=>{
    alert(error.message);
  })
}
goto_signup(){
  this.nav.navigateForward('signup');
}
anonymous() {
  this.af.auth.signInAnonymously().then(() => {
    localStorage.setItem('userid', this.af.auth.currentUser.uid);
    this.nav.navigateRoot('tabs/uploader');
  }).catch(err => {
    alert(err.message);
  });
 }
}
