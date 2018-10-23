import { Component, OnInit } from '@angular/core';

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

  constructor(private service: CursoService) { }

  ngOnInit() {
    this.service.getCursos().subscribe(cursos => {this.cursos = cursos; console.log(this.cursos)});
  }
  // Best practices for *ngFor
  trackByFn(index, curso) {
    return curso.id; // unique id corresponding to the item
 }

 clearState() {
   this.editState = false;
   this.cursoToEdit = null;
 }

 onUpdateCurso(curso: Curso) {
  this.service.updateCurso(curso);
  this.clearState();
 }

 deleteCurso(event, curso: Curso) {
  this.service.deleteCurso(curso);
  this.clearState();
 }

 editCurso(event, curso: Curso) {
  this.editState = true;
  this.cursoToEdit = curso;
 }

}
