import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: Curso[];
  editState: boolean = false;
  cursoToEdit: Curso;

  rForm: FormGroup; // our Form

  constructor(private service: CursoService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.service.getCursos()
    .subscribe(cursos => {
      this.cursos = cursos; console.log(this.cursos)
    });

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
