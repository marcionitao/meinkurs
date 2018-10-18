import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';

import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  curso: Curso = {
    name: '',
    description: '',
    former: '',
    price: '',
    language: '',
    technology: '',
    date: ''
  };

  constructor(private service: CursoService) { }

  ngOnInit() {
  }

  onGuardar(myForm: NgForm) {
    const dateNow = Date.now();
    this.curso.date = dateNow;
    this.service.addCurso(this.curso);
  }

}
