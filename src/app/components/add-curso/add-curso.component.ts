import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  rForm: FormGroup; // our Form
  newState: boolean = false;

  constructor(private service: CursoService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.rForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'description': ['', Validators.compose(
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
      )],
      'former': ['', Validators.required],
      'price': ['', Validators.required],
      'language': ['', Validators.required],
      'technology': ['', Validators.required],
      'validate': '',
      'date': ''
    });
  }

  onGuardar() {
    const dateNow = Date.now();
    // para atribuirmos a data atual ao campo data
    this.rForm.controls['date'].setValue(dateNow);

    this.service.addCurso(this.rForm.value);
    console.log(this.rForm.value);

    // limpa o formulario e retorna a barra
    this.clearState();
  }

  newCurso() {
    this.newState = true;
  }

  clearState() {
    // encolhe a barra
    this.newState = false;
    // limpa o formulario
    this.rForm.reset();
  }

}
