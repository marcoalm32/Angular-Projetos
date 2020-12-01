import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { People } from './people';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  peopleCollection: AngularFirestoreCollection<People> = this.afs.collection('people');

  constructor(private afs: AngularFirestore) { }

  register(p: People) {
    p.id= this.afs.createId(); //o id do firebase server não é o mesmo desse id criado 
    return this.peopleCollection.doc(p.id).set(p)
    // return this.peopleCollection.add(p);
  }

  delete(p: People) {
    return this.peopleCollection.doc(p.id).delete();

  }

  getPeople() : Observable<People[]> {
    return this.peopleCollection.valueChanges();
  }
}
