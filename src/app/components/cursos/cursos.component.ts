import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { AngularFirestore } from 'angularfire2/firestore';

import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos;
  editState = false;
  cursoToEdit: Curso;
  loadImage;
  ver;

  rForm: FormGroup; // our Form
  // Um BehaviorSubject contém um valor. Quando é subscrito, emite o valor imediatamente. Um Subject não possui  valor.
  startAt:BehaviorSubject<string | null> = new BehaviorSubject('');

  //searchList: Observable<Curso[]>;

  constructor(private service: CursoService,
              private formBuilder: FormBuilder,
              public afs: AngularFirestore,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.service.search(this.startAt)
    .subscribe(
      cursos => { this.cursos = cursos; console.log(this.cursos);
    });

  }

  convert(image) {
    let mySrc = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + image);
    return this.loadImage = mySrc;
  }

  list(searchText) {
    this.startAt.next(searchText);
    console.log(searchText)
  }

  // Best practices for *ngFor
  trackByFn(index, curso) {
    return curso.id; // unique id corresponding to the item
  }

  clearState() {
    this.editState = false;
    this.cursoToEdit = null;
  }

  onUpdateCurso() {
    this.service.updateCurso(this.rForm.value);
    this.clearState();
  }

  deleteCurso(event, curso: Curso) {
    this.service.deleteCurso(curso);
    this.clearState();

  }

  editCurso(event, curso: Curso) {
    this.editState = true;
    this.cursoToEdit = curso;

    this.rForm = this.formBuilder.group({
      'id': [this.cursoToEdit.id, Validators.required],
      'date': [this.cursoToEdit.date, Validators.required],
      'name': [this.cursoToEdit.name, Validators.required],
      'description': [this.cursoToEdit.description, Validators.compose(
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
      )],
      'former': [this.cursoToEdit.former, Validators.required],
      'price': [this.cursoToEdit.price, Validators.required],
      'language': [this.cursoToEdit.language, Validators.required],
      'technology': [this.cursoToEdit.technology, Validators.required],
      'validate': ''
    });

  }

}
