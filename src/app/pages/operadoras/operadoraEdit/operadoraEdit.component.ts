import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Operadora } from '../../../_models/Operadora';
import { OperadoraService } from '../../../_services/operadora.service';

@Component({
  selector: 'app-operadora-edit',
  templateUrl: './operadoraEdit.component.html',
  styleUrls: ['./operadoraEdit.component.scss']
})
export class OperadoraEditComponent implements OnInit {

  titulo = 'Editar Operadora';
  operadora: Operadora;
  registerForm: FormGroup;
  modoSalvar = 'post';

  constructor(
    private operadoraService: OperadoraService
  , private fb: FormBuilder
  , private router: ActivatedRoute
  , private toastr: ToastrService
  , public route: Router
  ) {
  }

  ngOnInit() {
    this.validation();
    this.carregarOperadora();
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

  carregarOperadora() {
    const idOperadora = +this.router.snapshot.paramMap.get('id');
    if (idOperadora !== 0) {
      this.modoSalvar = 'put';
      this.operadoraService.getOperadoraById(idOperadora).subscribe(
        (pax: Operadora) => {
        this.operadora = Object.assign({}, pax[0]);
        this.registerForm.patchValue(this.operadora);
      }, error => {
        this.toastr.error(`Erro ao tentar carregar operadora: ${error}!`);
      });
    } else {
      this.titulo = 'Nova Operadora';
    }
  }

  salvarOperadora() {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') { // POST

        this.operadora = Object.assign({opeR_COD_OPERADORA: 1}, this.registerForm.value);
        this.operadora.opeR_COD_OPERADORA = 1;

        this.operadoraService.postOperadora(this.operadora).subscribe(
          (novaOperadora: Operadora) => {
            // console.log(novaOperadora);
            this.toastr.success('Inserida com Sucesso!', 'Operadora');
            this.route.navigateByUrl('/operadoras');
          }, error => {
            this.toastr.error('Erro ao inserir!', 'Operadora');
          }
        );
      } else { // PUT
        this.operadora = Object.assign({id: this.operadora.opeR_COD_OPERADORA}, this.registerForm.value);

        this.operadoraService.putOperadora(this.operadora).subscribe(
          () => {
            this.toastr.success('Editada com Sucesso!', 'Operadora');
            this.route.navigateByUrl('/operadoras');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`, 'Operadora');
          }
        );
      }
    }
  }
}
