import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { finalize } from 'rxjs/operators';
import* as firebase from 'firebase';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
 text: string;
 chatRef: any;
 uid: string;
 user: any;
 sendto;
 userid
 displayName;

 id;
 name;
 url
 sub;
 photoURL:any;
  ref: any;
  downloadURL: any;
  uploadState: any;


 constructor(private storage: AngularFireStorage,private router: Router, private af: AngularFireAuth, private firebase: AngularFirestore, private route: ActivatedRoute,
  public fs:AngularFirestore,public nav:NavController, private authService: AuthService,public Storage: AngularFireStorage) {

   this.uid=this.af.auth.currentUser.uid;
   this.chatRef = this.firebase.collection('chatroom', ref=>ref.orderBy('Timestamp')).valueChanges();

   this.route.queryParams.subscribe(params => {
     this.displayName=params.displayName;
     this.sendto=params.userid;
     console.log("user "+ this.sendto);
   });
 }

 send(){
   if(this.text != ''){
     this.firebase.collection('chatroom').add({
       displayName: this.displayName,
       message: this.text,
       userid: this.af.auth.currentUser.uid,
       sendTo: this.sendto,
       Timestamp: Date.now(),
     });
     this.text="";
   }
 }
 ngOnInit() {
 }

//  upload(event) {
//   const file= event.target.files[0];
//  this.id = Math.random().toString(36).substring(2);
// const filepath=this.id;
// this.ref = this.Storage.ref(filepath);
// const task = this.Storage.upload(filepath, file);
// this.uploadState = task.percentageChanges();
// task.snapshotChanges().pipe(
//   finalize(() => {
//     this.downloadURL = this.ref.getDownloadURL().subscribe(url=>{
//        console.log(url);
//       this.fs.collection('chatroom').add({
//         // displayName: this.displayName,
//         Name: this.af.auth.currentUser.displayName,
//         photoURL:url,
//         UserID: this.af.auth.currentUser.uid,
//         Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
//         });
//      })
//    })
//  ).subscribe();
// } 
upload(event) {
  const file= event.target.files[0];
 this.id = Math.random().toString(36).substring(2);
const filepath=this.id;
this.ref = this.storage.ref(filepath);
const task = this.storage.upload(filepath, file);
this.uploadState = task.percentageChanges();
task.snapshotChanges().pipe(
  finalize(() => {
    this.downloadURL = this.ref.getDownloadURL().subscribe(url=>{
       console.log(url);
      this.firebase.collection('chatroom').add({
        displayName: this.displayName,
        photoURL:url,
        userid:this.af.auth.currentUser.uid,
        sendTo:this.sendto,
        Timestamp: Date.now(),
        });
     })
   })
 ).subscribe();
}
}