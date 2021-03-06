import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../_models/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  titulo = 'Usuários';
  usuariosFiltrados: Usuario[];
  usuarios: Usuario[];
  usuario: Usuario;
  filtroListaX: string;
  registerForm: FormGroup;
  modoSalvar = 'post';
  pag  = 1;
  contador = 5;

  constructor(
    private fb: FormBuilder
  , private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.validation();
    this.getUsuarios();
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      login: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
    });
  }

  get filtroLista(): string {
    return this.filtroListaX;
  }

  set filtroLista(value: string) {
    this.filtroListaX = value;
    this.usuariosFiltrados = this.filtroLista ? this.filtrarUnidades(this.filtroLista) : this.usuarios;
  }

  filtrarUnidades(filtrarPor: string): Usuario[] {
    filtrarPor =  filtrarPor.toLocaleLowerCase();
    return this.usuarios.filter(
      pal => pal.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  novoUsuario(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  editarUsuario(usuario: Usuario, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.usuario = Object.assign({}, usuario);
    this.registerForm.patchValue(this.usuario);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  salvarAlteracao(template: any) {
    template.hide();
  }

  getUsuarios() {

    this.usuarios = [
      {
        id: 201,
        nome: 'Gustavo',
        login: 'f225556',
        email: 'gustavo.barbosa@dasa.com.br',
        celular: '(11) 4165-9865'
      },
      {
        id: 822,
        nome: 'Marcia Celes Ferreira',
        login: 'f65645',
        email: 'marcia.ferreira@dasa.com.br',
        celular: '(11) 96165-9865'
      },
      {
        id: 729,
        nome: 'Rosana Maria da Silva',
        login: 'f45454',
        email: 'rosana.silva@dasa.com.br',
        celular: '(11) 96598-1020'
      }
    ];

    this.usuariosFiltrados = this.usuarios;

  }

  pageChanged(event) {
    this.pag = event;
  }

}
