import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Unidade } from '../../_models/Unidade';
import { Marca } from '../../_models/Marca';
import { UnidadeService } from '../../_services/unidade.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  titulo = 'Unidades';
  unidadesFiltrados: Unidade[];
  unidades: Unidade[];
  unidade: Unidade;
  filtroListaX: string;
  registerForm: FormGroup;
  modoSalvar = 'post';
  pag  = 1;
  contador = 5;
  marcas: Marca[];

  constructor(
    private unidadeService: UnidadeService
  , private fb: FormBuilder
  , private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.validation();
    this.getMarcas();
    this.getUnidades();
  }

  validation() {
    this.registerForm = this.fb.group({
      uniD_COD_UNIDADE: [''],
      uniD_NOM_UNIDADE: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      marC_NOM_MARCA: [''],
      regI_NOM_REGIONAL: [''],
      uniD_TXT_RESPONSAVE: [''],
      uniD_TXT_TELEFONE: [''],
      uniD_TXT_ENDERECO: [''],
      tipoUnidade: [''],
    });
  }

  criaMarca(marca: any): FormGroup {
    return this.fb.group({
      id: [marca.id],
      nome: [marca.nome, Validators.required]
    });
  }

  novaUnidade(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  editarUnidade(unidade: Unidade, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.unidade = Object.assign({}, unidade);
    this.registerForm.patchValue(this.unidade);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.unidade = Object.assign({uniD_COD_UNIDADE: 306}, this.registerForm.value);

        this.unidades.push(this.unidade);
        template.hide();
        // this.getOperadoras();
        this.toastr.success('Inserida com Sucesso!', 'Unidade');

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

        this.unidade = Object.assign({id: this.unidade.uniD_COD_UNIDADE}, this.registerForm.value);

        this.toastr.success('Alterada com Sucesso!', 'Unidade');

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
    this.unidadesFiltrados = this.filtroLista ? this.filtrarUnidades(this.filtroLista) : this.unidades;
  }

  filtrarUnidades(filtrarPor: string): Unidade[] {
    filtrarPor =  filtrarPor.toLocaleLowerCase();
    return this.unidades.filter(
      pal => pal.uniD_NOM_UNIDADE.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getUnidades() {

    // this.unidades = [
    //   {
    //     id: 217,
    //     unidade: '122 - Freguesia',
    //     marca: 'EXAME',
    //     regional: 'RIO DE JANEIRO',
    //     responsavel: 'Maria Rodrigues Antonino',
    //     telefone: '(21) 4165-9865',
    //     endereco: 'Estrada dos Três Rios, 1733',
    //     tipo_unidade: 'Mega'
    //   },
    //   {
    //     id: 147,
    //     unidade: '147 - Coleta Centro',
    //     marca: 'EXAME',
    //     regional: 'RIO DE JANEIRO',
    //     responsavel: 'NC',
    //     telefone: '(21) 4165-9865',
    //     endereco: 'NC',
    //     tipo_unidade: 'Grande'
    //   },
    //   {
    //     id: 110,
    //     unidade: 'AAR - Antonio Rapos',
    //     marca: 'ALVARO',
    //     regional: 'PARANÁ',
    //     responsavel: 'NC',
    //     telefone: '(99) 9999-9999',
    //     endereco: 'NC',
    //     tipo_unidade: 'PEQUENA'
    //   }
    // ];

    // this.unidadesFiltrados = this.unidades;

    this.unidadeService.getAllUnidade().subscribe(
      (pax: Unidade[]) => {
      this.unidades = pax;
      this.unidadesFiltrados = this.unidades;
    }, error => {
      this.toastr.error(`Erro ao tentar carregar unidades: ${error}!`);
    });
  }

  getMarcas() {

    this.unidadeService.getAllMarca().subscribe(
      (pax: Marca[]) => {
      this.marcas = pax;
      // console.log(this.marcas);
    }, error => {
      this.toastr.error(`Erro ao tentar buscar marcas: ${error}!`);
    });
  }

  pageChanged(event) {
    this.pag = event;
  }

}
