import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';


import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { ChatsService } from '../service/chats.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 
  users;
  uid: any;
  chatR: any;

  constructor(public nav:NavController, public fireAuth:AngularFireAuth,public afs:AngularFirestore,private route: Router,public af: AngularFireAuth) { 

    this.users=afs.collection('users').valueChanges();
    this.uid=af.auth.currentUser.uid;
  }

  ngOnInit() {
    
  }

  sendRequest(key){
    this.route.navigate(['/feed'] ,{ queryParams :{displayName: key.displayName , userid: key.uid}})
  }
 }
