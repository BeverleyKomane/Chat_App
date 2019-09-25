import { Component, OnInit } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import* as firebase from 'firebase';
// import { send } from 'q';
// import { TouchSequence } from 'selenium-webdriver';
import { AuthService } from '../service/auth.service';
import { ChatsService } from '../service/chats.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
text: string;
chatRef: any;
uid: string;

ref;
task: any;
uploadState: any;
uploadProgress: any;
downloadURL: any;

// imageURL:string
id;
name;
url
user: AngularFirestoreDocument;
sub;
photoURL:any;
  displayName: any;

  constructor(public fs:AngularFirestore,public af:AngularFireAuth,public nav:NavController, private authService: AuthService,
    public Storage: AngularFireStorage) {
    
    this.uid=this.af.auth.currentUser.uid;
    this.chatRef = this.fs.collection('chats', ref=>ref.orderBy('Timestamp')).valueChanges();

   }

  //  (method) MainPage.send():void
   send(){
if (this.text != ''){
  this.fs.collection('chats').add ({
    Name: this.af.auth.currentUser.displayName,
    Message: this.text,
    UserID: this.af.auth.currentUser.uid,
    Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
  });
  this.text='';
}
   } 
   
   
  ngOnInit() {
  }

logout(){
   this.authService.logO();
}
 
upload(event) {
  const file= event.target.files[0];
 this.id = Math.random().toString(36).substring(2);
const filepath=this.id;
this.ref = this.Storage.ref(filepath);
const task = this.Storage.upload(filepath, file);
this.uploadState = task.percentageChanges();
task.snapshotChanges().pipe(
  finalize(() => {
    this.downloadURL = this.ref.getDownloadURL().subscribe(url=>{
       console.log(url);
      this.fs.collection('chats').add({
        Name: this.af.auth.currentUser.displayName,
        photoURL:url,
        UserID: this.af.auth.currentUser.uid,
        Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });
     })
   })
 ).subscribe();
} 
}
