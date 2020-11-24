import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuarioEdit.component.html',
  styleUrls: ['./usuarioEdit.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  titulo = 'Editar Usuário';
  usuario: Usuario = new Usuario();
  imagemURL = 'assets/img/upload.png';
  registerForm: FormGroup;
  file: File;
  fileNameToUpdate: string;

  dataAtual = '';

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.validation();
    // this.carregarEvento();
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      login: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      imagemURL: [''],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }


}
