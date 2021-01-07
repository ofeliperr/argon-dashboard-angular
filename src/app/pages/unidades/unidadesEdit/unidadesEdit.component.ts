import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Unidade } from '../../../_models/Unidade';
import { Marca } from '../../../_models/Marca';
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
  registerForm: FormGroup;
  modoSalvar = 'post';
  tiposUnidade: any[];

  constructor(
    private unidadeService: UnidadeService
  , private fb: FormBuilder
  , private router: ActivatedRoute
  , private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.tiposUnidade = [{tipo: 'Pequena'}, {tipo: 'Média'}, {tipo: 'Grande'}, {tipo: 'Mega'}];
    this.validation();
    this.getMarcas();
    this.carregarUnidade();
  }

  validation() {
    this.registerForm = this.fb.group({
      uniD_COD_UNIDADE: [''],
      uniD_NOM_UNIDADE: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      marC_NOM_MARCA: [''],
      regI_NOM_REGIONAL: [''],
      uniD_TXT_RESPONSAVEL: [''],
      uniD_TXT_TELEFONE: [''],
      uniD_TXT_ENDERECO: [''],
      tipoUnidade: [''],
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
        this.toastr.error(`Erro ao tentar carregar marca: ${error}!`);
      });
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
          }, error => {
            this.toastr.error('Erro ao inserir!', 'Unidade');
          }
        );
      } else { // PUT
        this.unidade = Object.assign({id: this.unidade.uniD_COD_UNIDADE}, this.registerForm.value);
        // console.log(this.unidade);
        this.unidadeService.putUnidade(this.unidade).subscribe(
          () => {
            this.toastr.success('Editada com Sucesso!', 'Unidade');
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
}
