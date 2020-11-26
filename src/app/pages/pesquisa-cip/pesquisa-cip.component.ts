import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PesquisaCIP } from '../../models/PesquisaCIP';


@Component({
  selector: 'app-pesquisa-cip',
  templateUrl: './pesquisa-cip.component.html',
  styleUrls: ['./pesquisa-cip.component.scss']
})
export class PesquisaCipComponent implements OnInit {

  titulo = 'Pesquisa CIP-Visita';
  pesquisaFiltrados: PesquisaCIP[];
  pesquisas: PesquisaCIP[];
  pesquisa: PesquisaCIP;
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
    this.getPesquisas();
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

  abrirPesquisa(pesquisa: PesquisaCIP, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.pesquisa = Object.assign({}, pesquisa);
    this.registerForm.patchValue(this.pesquisa);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {

        // this.marca = Object.assign({id: 306}, this.registerForm.value);

        // console.log(this.marca);
        // this.marcas.push(this.marca);
        // template.hide();
        // // this.getOperadoras();
        // this.toastr.success('Inserido com Sucesso!', 'Marca');

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

        this.pesquisa = Object.assign({id: this.pesquisa.id}, this.registerForm.value);

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
    this.pesquisaFiltrados = this.filtroLista ? this.filtrarPesquisas(this.filtroLista) : this.pesquisas;
  }

  filtrarPesquisas(filtrarPor: string): PesquisaCIP[] {
    filtrarPor =  filtrarPor.toLocaleLowerCase();
    return this.pesquisas.filter(
      pal => pal.num_cip.toString().indexOf(filtrarPor) !== -1
    );
  }

  getPesquisas() {

    this.pesquisas = [
      {
        id: 77818671,
        num_cip: 76608268583,
        cod_procedimento: 12,
        dt_atendimento: '25/11/2020 10:50:00',
        carteirinha: 234234324
      }
    ];

    this.pesquisaFiltrados = this.pesquisas;

  }

  pageChanged(event) {
    this.pag = event;
  }

}
