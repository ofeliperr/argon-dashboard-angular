import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Link } from '../../models/Link';

@Component({
  selector: 'app-links-uteis',
  templateUrl: './linksuteis.component.html',
  styleUrls: ['./linksuteis.component.scss']
})
export class LinksUteisComponent implements OnInit {
  titulo = 'Links Úteis';
  linksFiltrados: Link[];
  links: Link[];
  link: Link;
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
    this.getLinks();
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      senha: [''],
      link: ['']
    });
  }

  novoLink(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  editarLink(link: Link, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.link = Object.assign({}, link);
    this.registerForm.patchValue(this.link);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.link = Object.assign({id: 306}, this.registerForm.value);

        console.log(this.link);
        this.links.push(this.link);
        template.hide();
        // this.getOperadoras();
        this.toastr.success('Inserido com Sucesso!', 'Link');

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

        this.link = Object.assign({id: this.link.id}, this.registerForm.value);

        this.toastr.success('Alterado com Sucesso!', 'Link');

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
    this.linksFiltrados = this.filtroLista ? this.filtrarLinks(this.filtroLista) : this.links;
  }

  filtrarLinks(filtrarPor: string): Link[] {
    filtrarPor =  filtrarPor.toLocaleLowerCase();
    return this.links.filter(
      pal => pal.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getLinks() {

    this.links = [
      {
        id: 1,
        nome: 'Mediservice',
        usuario: 'dasa9988',
        senha: 'fatura08',
        link: 'teste'
      },
      {
        id: 2,
        nome: 'Bradesco',
        usuario: '',
        senha: '',
        link: 'http://www.bradescosaude.com.br/acessibilidade/home.do'
      },
      {
        id: 3,
        nome: 'Sul América Saude Lavoisier',
        usuario: '123123',
        senha: 'fatura08',
        link: 'https://portal.sulamericaseguros'
      }
    ];

    this.linksFiltrados = this.links;

    // this.palestranteService.getAllPalestrante().subscribe(
    //   (pax: Palestrante[]) => {
    //   this.palestrantes = pax;
    //   this.palestrantesFiltrados = this.palestrantes;
    // }, error => {
    //   this.toastr.error(`Erro ao tentar carregar palestrantes: ${error}!`);
    // });
  }

  pageChanged(event) {
    this.pag = event;
  }


}
