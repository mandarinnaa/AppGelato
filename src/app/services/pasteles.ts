import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PastelesService {

  constructor(private firestore: Firestore) {}

  createPastel(data: any) {
    const pastelesRef = collection(this.firestore, 'pasteles');
    return addDoc(pastelesRef, data);
  }

  getPasteles(): Observable<any[]> {
    const pastelesRef = collection(this.firestore, 'pasteles');
    return collectionData(pastelesRef, { idField: 'id' }) as Observable<any[]>;
  }


  updateStock(id: string, stock: number) {
    const pastelDoc = doc(this.firestore, `pasteles/${id}`);
    return updateDoc(pastelDoc, { stock });
  }

  deletePastel(id: string) {
    const pastelDoc = doc(this.firestore, `pasteles/${id}`);
    return deleteDoc(pastelDoc);
  }

}
