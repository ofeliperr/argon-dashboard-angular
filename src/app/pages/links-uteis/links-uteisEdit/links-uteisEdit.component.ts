import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private linkService: LinkService
  , private fb: FormBuilder
  , private router: ActivatedRoute
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
    this.linkService.getLinkById(idLink)
      .subscribe(
        (link: Link) => {
          this.link = Object.assign({}, link);
          this.registerForm.patchValue(this.link);
        }
      );
  }


}
