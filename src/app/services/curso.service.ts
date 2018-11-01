import { Curso } from './../models/curso';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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
    // this.cursos = afs.collection('cursos').valueChanges();
    // tudo isso para se conseguir trazeer a data e o id
    this.cursoCollection = afs.collection<Curso>('cursos');
    this.cursos = this.cursoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Curso;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    )
  }

  getCursos() {
    return this.cursos;
  }

  getCurso(curso: Curso) {
    return this.cursoDoc = this.afs.doc(`cursos/${curso.id}`);
  }

  addCurso(curso: Curso) {
   // console.log('novo curso');
    this.cursoCollection.add(curso);
  }

  deleteCurso(curso: Curso) {
    this.cursoDoc = this.afs.doc(`cursos/${curso.id}`);
    this.cursoDoc.delete();
  }

  updateCurso(curso: Curso) {
    this.cursoDoc = this.afs.doc(`cursos/${curso.id}`);
    this.cursoDoc.update(curso);
  }
}
