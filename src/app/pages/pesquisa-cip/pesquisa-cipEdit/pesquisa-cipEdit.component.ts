import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PesquisaCIP } from '../../../_models/PesquisaCIP';

@Component({
  selector: 'app-pesquisa-cip-edit',
  templateUrl: './pesquisa-cipEdit.component.html',
  styleUrls: ['./pesquisa-cipEdit.component.scss']
})
export class PesquisaCipEditComponent implements OnInit {

  titulo = 'Detalhe da Guia TISS';
  pesquisa: PesquisaCIP = new PesquisaCIP();
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]]
    });
  }

}
