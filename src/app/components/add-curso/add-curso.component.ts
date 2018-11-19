import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fileUpload from 'fuctbase64';

import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  rForm: FormGroup; // our Form
  newState: boolean = false;
  fileResult;

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
      'date': '',
      'image': ''
    });
  }
  // faz upload da image
  onFileChange(event) {
    let result = fileUpload(event);
    this.fileResult = result;
  }

  onGuardar() {
    const dateNow = Date.now();
    // para atribuirmos a data atual ao campo data
    this.rForm.controls['date'].setValue(dateNow);
    // para atribuirmos a image no formato base64
    this.rForm.controls['image'].setValue(this.fileResult.__zone_symbol__value.base64);

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
    // limpar buffer de upload de image
    this.fileResult = '';
  }

}
