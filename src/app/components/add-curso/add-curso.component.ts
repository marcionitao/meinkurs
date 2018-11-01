import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  rForm: FormGroup; // our Form

  curso: Curso = {
    name: '',
    description: '',
    former: '',
    price: '',
    language: '',
    technology: '',
    date: ''
  };

  newState: boolean = false;

  constructor(private service: CursoService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.rForm = this.formBuilder.group({
      'name': [this.curso.name, Validators.required],
      'description': [this.curso.description, Validators.compose(
        [Validators.required, Validators.minLength(30), Validators.maxLength(500)]
      )],
      'former': [this.curso.former, Validators.required],
      'price': [this.curso.price, Validators.required],
      'language': [this.curso.language, Validators.required],
      'technology': [this.curso.technology, Validators.required],
      'validate': ''
    });

  }

  onGuardar(neu) {
    const dateNow = Date.now();
    this.curso.date = dateNow;

    this.curso.description = neu.description;
    this.curso.name = neu.name;
    this.curso.former = neu.former;
    this.curso.price = neu.price;
    this.curso.language = neu.language;
    this.curso.technology = neu.technology;

    this.service.addCurso(this.curso);
    this.clearState();

    console.log(this.rForm.value);
  }

  newCurso() {
    this.newState = true;
  }

  clearState() {
    this.newState = false;
    this.curso = null;
  }

}
