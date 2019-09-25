import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from "rxjs/operators";
// import { message } from "../model/message";
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  description : string
  name : string
  id: string
  img : string

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public nav : NavController) { 
    afAuth.auth.onAuthStateChanged((user)=>{
      if(user){
        this.nav.navigateRoot("tabs/main");
      }else{
        this.nav.navigateRoot("");
      }
    })
  }
  logO(){
    this.afAuth.auth.signOut()
 }

 getChatRooms(){
    
  return this.afs.collection('chatsRooms').snapshotChanges().pipe(map(rooms => {
    return rooms.map(a =>{
      const data = a.payload.doc.data() as AuthService;
      data.id = a.payload.doc.id;
      return data;
    })
  }))
}

getChatRoom( chat_id : string){
  return this.afs.collection('chatsRooms').doc(chat_id).valueChanges()
}


// sendMsgToFirebase( message : message, chat_id : string){

//   this.afs.collection('chatsRooms').doc(chat_id).update({
//     messages : firestore.FieldValue.arrayUnion(message),
//   })
// }

}
