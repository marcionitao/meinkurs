import { Component, OnInit } from '@angular/core';

import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  constructor(private service: CursoService) { }

  ngOnInit() {
    this.service.getCursos().subscribe(cursos => console.log(cursos));
  }

}
