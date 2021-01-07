import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Link } from '../../../_models/Link';
import { LinkService } from '../../../_services/link.service';

@Component({
  selector: 'app-links-uteis-edit',
  templateUrl: './links-uteisEdit.component.html',
  styleUrls: ['./links-uteisEdit.component.scss']
})
export class LinksUteisEditComponent implements OnInit {

  titulo = 'Editar Link';
  link: Link = new Link();
  registerForm: FormGroup;
  modoSalvar = 'post';

  constructor(
    private linkService: LinkService
  , private fb: FormBuilder
  , private router: ActivatedRoute
  , private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.validation();
    this.carregarLink();
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

  carregarLink() {
    const idLink = +this.router.snapshot.paramMap.get('id');
    if (idLink !== 0) {
      this.modoSalvar = 'put';
      this.linkService.getLinkById(idLink)
        .subscribe(
          (pax: Link) => {
            this.link = Object.assign({}, pax[0]);
            this.registerForm.patchValue(this.link);
          }, error => {
            this.toastr.error(`Erro ao tentar carregar marca: ${error}!`);
          });
    }
  }

  salvarLink() {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') { // POST
        this.link = Object.assign({calI_SKU_LINK: 306}, this.registerForm.value);

        this.linkService.postLink(this.link).subscribe(
          (novoLink: Link) => {
            // console.log(novoLink);
            this.toastr.success('Inserido com Sucesso!', 'Link');
          }, error => {
            this.toastr.error('Erro ao inserir!', 'Link');
          }
        );
      } else { // PUT
        this.link = Object.assign({id: this.link.calI_SKU_LINK}, this.registerForm.value);
        // console.log(this.link);

        this.linkService.putLink(this.link).subscribe(
          () => {
            this.toastr.success('Editado com Sucesso!', 'Link');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`, 'Link');
          }
        );
      }
    }
  }

}
