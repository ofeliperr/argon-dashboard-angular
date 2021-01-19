import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'https://localhost:44385/api/Usuario';
  // jwtHelper = new JwtHelperService();
  // decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any): Observable<User> {
    return this.http
      .post<User>(`${this.baseURL}/login`, model)
      .pipe(
        tap((u: User) => {
          sessionStorage.setItem('username', u.usmO_NOM_USUARIO);
          // localStorage.setItem('token', u.authorization);
          // this.subjLoggedIn$.next(true);
          // this.subjUser$.next(u);
          if (u.usmO_ATIVO) {
            return u;
          } else {
            throw new Error('Usuário inválido');
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(`${this.baseURL}register`, model);
  }
  // loggedIn() {
  //   const token = localStorage.getItem('token');
  //   return !this.jwtHelper.isTokenExpired(token);
  // }



}
