import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};

  constructor(
    private authService: AuthService
  , public router: Router
  , private toastr: ToastrService) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {

    this.authService.login(this.model)
    .subscribe(
      (user) => {
        console.log(user);
        console.log(localStorage.getItem('username'));
        this.router.navigateByUrl('/dashboard');
        this.toastr.success(`Bem vindo`);
        // this.loading = false;
      },
      (err) => {
        this.toastr.error(`Falha ao tentar logar`);
        console.log(err);
        // this.usuarioInvalido = true;
        // this.loading = false;
      }

    );

    // this.authService.login(this.model)
    //   .subscribe(
    //     () => {
    //       this.router.navigate(['/dashboard']);
    //       this.toastr.success(`Bem vindo`);
    //     },
    //     error => {
    //       this.toastr.error(`Falha ao tentar logar`);
    //     }
    //   );
  }

}
