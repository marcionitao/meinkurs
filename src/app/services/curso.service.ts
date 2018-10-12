import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Curso } from '../models/curso';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoCollection: AngularFirestoreCollection<Curso>;
  cursos: Observable<Curso[]>;
  cursoDoc: AngularFirestoreDocument<Curso>;

  constructor(public afs: AngularFirestore) {
    this.cursos = afs.collection('cursos').valueChanges();
  }

  getCursos(){
    return this.cursos;
  }
}
