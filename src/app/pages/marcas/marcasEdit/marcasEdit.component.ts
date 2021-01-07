import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Marca } from '../../../_models/Marca';
import { MarcaService } from '../../../_services/marca.service';

@Component({
  selector: 'app-marcas-edit',
  templateUrl: './marcasEdit.component.html',
  styleUrls: ['./marcasEdit.component.scss']
})
export class MarcasEditComponent implements OnInit {
  titulo = 'Editar Marca';
  marcas: Marca[];
  marca: Marca;
  registerForm: FormGroup;
  modoSalvar = 'post';

  constructor(
    private marcaService: MarcaService
  , private fb: FormBuilder
  , private router: ActivatedRoute
  , private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.validation();
    this.carregarMarca();
    // this.registerForm.patchValue({
    //   marC_COD_MARCA: '1',
    //   marC_NOM_MARCA: 'Teste'
    // });
  }

  validation() {
    this.registerForm = this.fb.group({
      marC_COD_MARCA: [''],
      marC_NOM_MARCA: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]]
    });
  }

  carregarMarca() {
    const idMarca = +this.router.snapshot.paramMap.get('id');
    if (idMarca !== 0) {
      this.modoSalvar = 'put';
      this.marcaService.getMarcaById(idMarca).subscribe(
        (pax: Marca) => {
        this.marca = Object.assign({}, pax[0]);
        this.registerForm.patchValue(this.marca);
      }, error => {
        this.toastr.error(`Erro ao tentar carregar marca: ${error}!`);
      });
    }
  }

  salvarMarca() {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') { // POST
        this.marca = Object.assign({marC_COD_MARCA: 1}, this.registerForm.value);
        this.marca.marC_COD_MARCA = 1;

        this.marcaService.postMarca(this.marca).subscribe(
          (novaMarca: Marca) => {
            // console.log(novaMarca);
            this.toastr.success('Inserida com Sucesso!', 'Marca');
          }, error => {
            this.toastr.error('Erro ao inserir!', 'Marca');
          }
        );
      } else { // PUT
        this.marca = Object.assign({id: this.marca.marC_COD_MARCA}, this.registerForm.value);
        // console.log(this.marca);
        this.marcaService.putMarca(this.marca).subscribe(
          () => {
            this.toastr.success('Editada com Sucesso!', 'Marca');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`, 'Marca');
          }
        );
      }
    }
  }
}
