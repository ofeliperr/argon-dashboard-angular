import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../_models/Usuario';

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
  modoSalvar = 'post';

  constructor(
    private fb: FormBuilder
  , private router: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
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

  carregarUsuario() {
    const idUsuario = +this.router.snapshot.paramMap.get('id');
    if (idUsuario !== 0) {
      this.modoSalvar = 'put';
      // this.unidadeService.getUnidadeById(idUnidade).subscribe(
      //   (pax: Unidade) => {
      //   this.unidade = Object.assign({}, pax[0]);
      //   this.registerForm.patchValue(this.unidade);
      // }, error => {
      //   this.toastr.error(`Erro ao tentar carregar unidade: ${error}!`);
      // });
    } else {
      this.titulo = 'Novo Usuário';
    }
  }


}
