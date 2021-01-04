import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Link } from '../../_models/Link';
import { LinkService } from '../../_services/link.service';

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
    private linkService: LinkService
  , private fb: FormBuilder
  , private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.validation();
    this.getLinks();
  }

  validation() {
    this.registerForm = this.fb.group({
      calI_SKU_LINK: [''],
      calI_NOM_LINK: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      calI_TXT_USUARIO_LOGIN: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      calI_TXT_SENHA_LOGIN: [''],
      calI_TXT_URL_LINK: ['']
    });
  }

  novoLink(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
    this.registerForm.reset();
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

        // this.link = Object.assign({calI_SKU_LINK: 306}, this.registerForm.value);
        // console.log(this.link);
        // this.links.push(this.link);
        // template.hide();
        // this.getOperadoras();
        // this.toastr.success('Inserido com Sucesso!', 'Link');

        this.link = Object.assign({calI_SKU_LINK: 306}, this.registerForm.value);

        this.linkService.postLink(this.link).subscribe(
          (novoLink: Link) => {
            console.log(novoLink);
            template.hide();
            this.getLinks();
            this.toastr.success('Inserido com Sucesso!', 'Link');
          }, error => {
            this.toastr.error('Erro ao inserir!', 'Link');
          }
        );

      } else {

        this.link = Object.assign({id: this.link.calI_SKU_LINK}, this.registerForm.value);
        // this.toastr.success('Alterado com Sucesso!', 'Link');

        this.linkService.putLink(this.link).subscribe(
          () => {
            template.hide();
            this.getLinks();
            this.toastr.success('Alterado com Sucesso!', 'Link');
          }, error => {
            this.toastr.error('Erro ao alterar!', 'Link');
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
    this.linksFiltrados = this.filtroLista ? this.filtrarLinks(this.filtroLista) : this.links;
  }

  filtrarLinks(filtrarPor: string): Link[] {
    filtrarPor =  filtrarPor.toLocaleLowerCase();
    return this.links.filter(
      pal => pal.calI_NOM_LINK.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getLinks() {

    // this.links = [
    //   {
    //     id: 1,
    //     nome: 'Mediservice',
    //     usuario: 'dasa9988',
    //     senha: 'fatura08',
    //     link: 'teste'
    //   },
    //   {
    //     id: 2,
    //     nome: 'Bradesco',
    //     usuario: '',
    //     senha: '',
    //     link: 'http://www.bradescosaude.com.br/acessibilidade/home.do'
    //   },
    //   {
    //     id: 3,
    //     nome: 'Sul América Saude Lavoisier',
    //     usuario: '123123',
    //     senha: 'fatura08',
    //     link: 'https://portal.sulamericaseguros'
    //   }
    // ];

    // this.linksFiltrados = this.links;

    this.linkService.getAllLink().subscribe(
      (pax: Link[]) => {
      // console.log(pax);
      this.links = pax;
      this.linksFiltrados = this.links;
    }, error => {
      this.toastr.error(`Erro ao tentar carregar links: ${error}!`);
    });
  }

  pageChanged(event) {
    this.pag = event;
  }


}
