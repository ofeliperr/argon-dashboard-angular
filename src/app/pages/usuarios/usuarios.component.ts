import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';

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
  modoSalvar = 'post';
  pag  = 1;
  contador = 5;

  constructor() { }

  ngOnInit() {
    this.getUsuarios();
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

}
