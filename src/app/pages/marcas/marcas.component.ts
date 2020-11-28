import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Marca } from '../../_models/Marca';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  titulo = 'Marcas';
  marcasFiltrados: Marca[];
  marcas: Marca[];
  marca: Marca;
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
    this.getMarcas();
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]]
    });
  }

  novaMarca(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  editarMarca(marca: Marca, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.marca = Object.assign({}, marca);
    this.registerForm.patchValue(this.marca);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.marca = Object.assign({id: 306}, this.registerForm.value);

        console.log(this.marca);
        this.marcas.push(this.marca);
        template.hide();
        // this.getOperadoras();
        this.toastr.success('Inserido com Sucesso!', 'Marca');

        // this.palestranteService.postPalestante(this.operadora).subscribe(
        //   (novaOperadora: Operadora) => {
        //     console.log(novaOperadora);
        //     template.hide();
        //     this.getOperadoras();
        //     this.toastr.success('Inserido com Sucesso!', 'Operadora');
        //   }, error => {
        //     this.toastr.error('Erro ao inserir!', 'Operadora');
        //   }
        // );

      } else {

        this.marca = Object.assign({id: this.marca.id}, this.registerForm.value);

        this.toastr.success('Alterado com Sucesso!', 'Marca');

        // this.palestranteService.putPalestrante(this.operadora).subscribe(
        //   () => {
        //     template.hide();
        //     this.getOperadoras();
        //     this.toastr.success('Alterado com Sucesso!', 'Operadora');
        //   }, error => {
        //     this.toastr.error('Erro ao alterar!', 'Operadora');
        //   }
        // );
      }
    }
  }

  get filtroLista(): string {
    return this.filtroListaX;
  }

  set filtroLista(value: string) {
    this.filtroListaX = value;
    this.marcasFiltrados = this.filtroLista ? this.filtrarMarcas(this.filtroLista) : this.marcas;
  }

  filtrarMarcas(filtrarPor: string): Marca[] {
    filtrarPor =  filtrarPor.toLocaleLowerCase();
    return this.marcas.filter(
      pal => pal.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getMarcas() {

    this.marcas = [
      {
        id: 1,
        nome: 'Delboni Auriemo'
      },
      {
        id: 2,
        nome: 'Lavoisier'
      },
      {
        id: 3,
        nome: 'Exame'
      }
    ];

    this.marcasFiltrados = this.marcas;

  }

  pageChanged(event) {
    this.pag = event;
  }


}
