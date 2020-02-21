import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Music } from '../models/music.interface'
@Injectable({
  providedIn: 'root'
})
export class FireService {
  private music : Music[] = [];
  constructor(private db: AngularFirestore) { }

  createAnObject(Music: any){
    this.db.doc(`/music/${Music.id}`).set({Music});
  }

  createId(){
    return this.db.createId();
  }

  getCollection(){
    this.music = [];
      let musicCollection: AngularFirestoreCollection = this.db.collection<Music>('music');
      musicCollection.valueChanges().subscribe(
        res => {
          res.forEach(element => {
            this.music.push(element.Music);
          })
        }
      );
    return this.music;
  }
}
