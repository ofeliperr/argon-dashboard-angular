import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Unidade } from '../../../_models/Unidade';
import { Marca } from '../../../_models/Marca';
import { Regional } from '../../../_models/Regional';
import { UnidadeService } from '../../../_services/unidade.service';

@Component({
  selector: 'app-unidades-edit',
  templateUrl: './unidadesEdit.component.html',
  styleUrls: ['./unidadesEdit.component.scss']
})
export class UnidadesEditComponent implements OnInit {

  titulo = 'Editar Unidade';
  unidade: Unidade;
  marcas: Marca[];
  regionais: Regional[];
  registerForm: FormGroup;
  modoSalvar = 'post';
  tiposUnidade: any[];

  constructor(
    private unidadeService: UnidadeService
  , private fb: FormBuilder
  , private router: ActivatedRoute
  , private toastr: ToastrService
  , public route: Router
  ) {
  }

  async ngOnInit() {
    this.tiposUnidade = [{tipo: 'Pequena', codigo: 1}, {tipo: 'Média', codigo: 4}, {tipo: 'Grande', codigo: 2}, {tipo: 'Mega', codigo: 3}];
    this.validation();
    this.getMarcas();
    this.getRegionais();
    this.carregarUnidade();
  }

  validation() {
    this.registerForm = this.fb.group({
      uniD_COD_UNIDADE: [''],
      uniD_NOM_UNIDADE: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      marC_COD_MARCA: [''],
      marC_NOM_MARCA: [''],
      regI_COD_REGIONAL: [''],
      regI_NOM_REGIONAL: [''],
      uniD_TXT_RESPONSAVEL: [''],
      uniD_TXT_TELEFONE: [''],
      uniD_TXT_CELULAR: [''],
      uniD_TXT_ENDERECO: [''],
      uniD_NOM_CONTATO_PRI_NIVEL: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      uniD_TXT_PRI_TELEFONE: [''],
      uniD_TXT_PRI_CEL: ['', [Validators.required]],
      tipoUnidade: [''],
      tiuN_SKU_TIPO_UNIDADE: [''],
    });
  }

  carregarUnidade() {
    const idUnidade = +this.router.snapshot.paramMap.get('id');
    if (idUnidade !== 0) {
      this.modoSalvar = 'put';
      this.unidadeService.getUnidadeById(idUnidade).subscribe(
        (pax: Unidade) => {
        this.unidade = Object.assign({}, pax[0]);
        this.registerForm.patchValue(this.unidade);
      }, error => {
        this.toastr.error(`Erro ao tentar carregar unidade: ${error}!`);
      });
    } else {
      this.titulo = 'Nova Unidade';
    }
  }

  salvarUnidade() {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') { // POST
        this.unidade = Object.assign({uniD_COD_UNIDADE: 1}, this.registerForm.value);
        this.unidade.uniD_COD_UNIDADE = 1;

        this.unidadeService.postUnidade(this.unidade).subscribe(
          (novaUnidade: Unidade) => {
            // console.log(novaUnidade);
            this.toastr.success('Inserida com Sucesso!', 'Unidade');
            this.route.navigateByUrl('/unidades');
          }, error => {
            this.toastr.error('Erro ao inserir!', 'Unidade');
          }
        );
      } else { // PUT
        this.unidade = Object.assign({id: this.unidade.uniD_COD_UNIDADE}, this.registerForm.value);
        this.unidade.tiuN_SKU_TIPO_UNIDADE = this.tiposUnidade.find(t => t.tipo === this.unidade.tipoUnidade).codigo;
        this.unidade.marC_COD_MARCA = this.marcas.find(m => m.marC_NOM_MARCA === this.unidade.marC_NOM_MARCA).marC_COD_MARCA;
        this.unidade.regI_COD_REGIONAL = this.regionais.find(r => r.regI_NOM_REGIONAL === this.unidade.regI_NOM_REGIONAL).regI_COD_REGIONAL;
        console.log(this.unidade);

        this.unidadeService.putUnidade(this.unidade).subscribe(
          () => {
            this.toastr.success('Editada com Sucesso!', 'Unidade');
            this.route.navigateByUrl('/unidades');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`, 'Unidade');
          }
        );
      }
    }
  }

  getMarcas() {
    this.unidadeService.getAllMarca().subscribe(
      (pax: Marca[]) => {
      this.marcas = pax;
    }, error => {
      this.toastr.error(`Erro ao tentar buscar marcas: ${error}!`);
    });
  }

  getRegionais() {
    this.unidadeService.getAllRegional().subscribe(
      (pax: Regional[]) => {
      this.regionais = pax;
    }, error => {
      this.toastr.error(`Erro ao tentar buscar regionais: ${error}!`);
    });
  }
}
