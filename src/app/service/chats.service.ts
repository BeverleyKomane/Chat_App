import { Injectable } from '@angular/core';

// import {AngularFirestore} from '@angular/fire/firestore';
import { map } from "rxjs/operators";
// import { message } from '../models/message';
import { firestore } from 'firebase';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface chat {
  
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {


  // getchatsroom(): any {
  //   throw new Error("Method not implemented.");
  // }

  constructor() {

   }

 

}
