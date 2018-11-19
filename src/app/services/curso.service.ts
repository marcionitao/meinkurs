import { Curso } from './../models/curso';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoCollection: AngularFirestoreCollection<Curso>;
  cursos: Observable<Curso[]>;
  cursoDoc: AngularFirestoreDocument<Curso>;

  constructor(public afs: AngularFirestore) {
  //   this.cursos = afs.collection('cursos').valueChanges();
  //   // tudo isso para se conseguir trazeer a data e o id
  //   this.cursoCollection = afs.collection<Curso>('cursos');
  //   this.cursos = this.cursoCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Curso;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   )
  }

  search(start: BehaviorSubject<string>): Observable<any[]> {
    return start
      .pipe(
        switchMap(startText => {
          const endText = startText + '\uf8ff';
          return this.afs
            .collection('cursos', ref =>
              ref
                .orderBy('name')
                .limit(20)
                .startAt(startText)
                .endAt(endText)
            )
            .snapshotChanges().pipe(
              map(changes => {
                return changes.map(c => {
                 // console.log(c);
                  const data = c.payload.doc.data();
                  const id = c.payload.doc.id;
                  return { id, ...data };
                });
              })
            )

        }
        )
      )
  }

  getCursos() {
    return this.cursos;
  }

  addCurso(curso: Curso) {
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
