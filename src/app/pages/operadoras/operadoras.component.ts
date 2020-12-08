import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Operadora } from '../../_models/Operadora';

@Component({
  selector: 'app-operadoras',
  templateUrl: './operadoras.component.html',
  styleUrls: ['./operadoras.component.scss']
})
export class OperadorasComponent implements OnInit {

  titulo = 'Operadoras';
  operadorasFiltrados: Operadora[];
  operadoras: Operadora[];
  operadora: Operadora;
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
    this.getOperadoras();
  }

  validation() {
    this.registerForm = this.fb.group({
      opeR_COD_OPERADORA: [''],
      opeR_NOM_OPERADORA: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      opeR_COD_NEGA_OK: [''],
      opeR_TXT_REQUISICAO: ['', Validators.required],
      opeR_ATIVA: ['']
    });
  }

  novaOperadora(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }
  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.operadora = Object.assign({id: 306}, this.registerForm.value);

        console.log(this.operadora);
        this.operadoras.push(this.operadora);
        template.hide();
        // this.getOperadoras();
        this.toastr.success('Inserido com Sucesso!', 'Operadora');

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

        this.operadora = Object.assign({id: this.operadora.opeR_COD_OPERADORA}, this.registerForm.value);

        this.toastr.success('Alterado com Sucesso!', 'Operadora');

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
    this.operadorasFiltrados = this.filtroLista ? this.filtrarOperadoras(this.filtroLista) : this.operadoras;
  }

  filtrarOperadoras(filtrarPor: string): Operadora[] {
    filtrarPor =  filtrarPor.toLocaleLowerCase();
    return this.operadoras.filter(
      pal => pal.opeR_NOM_OPERADORA.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getOperadoras() {

    // this.operadoras = [
    //   {
    //     id: 32323,
    //     nome: 'EMPRESA BRASILEIRA DE CORREIOS E TELEGRAFOS',
    //     codigo_negativa: 101,
    //     texto_requisicao: '',
    //     ativa: true
    //   },
    //   {
    //     id: 32354,
    //     nome: 'ABET',
    //     codigo_negativa: 102,
    //     texto_requisicao: '',
    //     ativa: true
    //   },
    //   {
    //     id: 33424,
    //     nome: 'AFRESP',
    //     codigo_negativa: 103,
    //     texto_requisicao: '',
    //     ativa: true
    //   }
    // ];

    this.operadorasFiltrados = this.operadoras;

  }

  pageChanged(event) {
    this.pag = event;
  }

}
