import { Component, OnInit } from '@angular/core';


import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import *as  firestore from "firebase"
  // import { firestore } from 'firebase';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
email: string;
pwd: string;
username: string;

  constructor(public nav:NavController,public fs:AngularFirestore,public af:AngularFireAuth) { 

  }

  ngOnInit() {
  }
  signup() {
    this.af.auth.createUserWithEmailAndPassword(this.email,this.pwd).then(()=>{
      localStorage.setItem('userid', this.af.auth.currentUser.uid);
      
      this.fs.collection('users').doc(this.af.auth.currentUser.uid).set({
        displayName:this.username,
        uid: this.af.auth.currentUser.uid,
        Timestamp:firestore.firestore.FieldValue.serverTimestamp(),
        Email:this.email,
        photoURL:''
      }).catch(error=>{
        alert(error.message)
      })

      this.af.auth.currentUser.updateProfile({
        displayName: this.username,
        photoURL: ''
        
      }).then (()=>{
        this.nav.navigateRoot('tabs/main');
    }).catch(error=>{
      alert(error.message)
    })
  }).catch(error =>{
    alert(error.message)
  })
}
goto_login(){
  this.nav.navigateRoot('/home');
}
}