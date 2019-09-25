import { Component, OnInit } from '@angular/core';
import {finalize} from 'rxjs/operators';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
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
photoURL;

  constructor(public Storage: AngularFireStorage , private  af: AngularFireAuth, private afs :AngularFirestore) { 
    this.af.auth.currentUser.photoURL;
    this.name=af.auth.currentUser.displayName;

    this.user=afs.doc(`users/${this.af.auth.currentUser.uid}`)
    this.sub=this.user.valueChanges().subscribe(event=>{
      this.photoURL = event.photoURL
      // this.photoURL = '/assets/icon/pic.png'
    })
  }
  ngOnInit() {
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
          this.af.auth.currentUser.updateProfile({
            photoURL: url
          })
          this.user.update({
            photoURL: url
          })
        })  
      })
    ).subscribe();
  }   
}
