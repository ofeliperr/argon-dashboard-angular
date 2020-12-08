import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Marca } from '../../_models/Marca';
import { MarcaService } from '../../_services/marca.service';

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
    private marcaService: MarcaService
  , private fb: FormBuilder
  , private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.validation();
    this.getMarcas();
  }

  validation() {
    this.registerForm = this.fb.group({
      marC_COD_MARCA: [''],
      marC_NOM_MARCA: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]]
    });
  }

  novaMarca(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
    this.registerForm.reset();
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

        this.marca = Object.assign({marC_COD_MARCA: 1}, this.registerForm.value);
        this.marca.marC_COD_MARCA = 1;

        // console.log(this.marca);
        // this.marcas.push(this.marca);
        // template.hide();
        // this.getMarcas();
        // this.toastr.success('Inserido com Sucesso!', 'Marca');

        this.marcaService.postMarca(this.marca).subscribe(
          (novaMarca: Marca) => {
            // console.log(novaMarca);
            template.hide();
            this.getMarcas();
            this.toastr.success('Inserida com Sucesso!', 'Marca');
          }, error => {
            this.toastr.error('Erro ao inserir!', 'Marca');
          }
        );

      } else {

        this.marca = Object.assign({id: this.marca.marC_COD_MARCA}, this.registerForm.value);
        // this.toastr.success('Alterado com Sucesso!', 'Marca');

        this.marcaService.putMarca(this.marca).subscribe(
          () => {
            template.hide();
            this.getMarcas();
            this.toastr.success('Alterada com Sucesso!', 'Marca');
          }, error => {
            this.toastr.error('Erro ao alterar!', 'Marca');
          }
        );

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
      pal => pal.marC_NOM_MARCA.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getMarcas() {

    // this.marcas = [
    //   {
    //     marC_COD_MARCA: 1,
    //     marC_NOM_MARCA: 'Delboni Auriemo'
    //   },
    //   {
    //     marC_COD_MARCA: 2,
    //     marC_NOM_MARCA: 'Lavoisier'
    //   },
    //   {
    //     marC_COD_MARCA: 3,
    //     marC_NOM_MARCA: 'Exame'
    //   }
    // ];

    // this.marcasFiltrados = this.marcas;

    this.marcaService.getAllMarca().subscribe(
      (pax: Marca[]) => {
      this.marcas = pax;
      this.marcasFiltrados = this.marcas;
    }, error => {
      this.toastr.error(`Erro ao tentar carregar marcas: ${error}!`);
    });
  }

  pageChanged(event) {
    this.pag = event;
  }


}
