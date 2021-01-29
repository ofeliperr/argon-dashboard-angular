import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Auth } from './Auth';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Text } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = environment.baseUrl + '/api/Usuario';
  private baseURLAuth = environment.baseUrl + '/api/Auth/Token';
  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // jwtHelper = new JwtHelperService();
  // decodedToken: any;

  constructor(private http: HttpClient) { }

  autenticar(model: any) {
    return this.http
    .post(this.baseURLAuth, model, {responseType: 'text'})
    .pipe(
      tap((u: string) => {
        localStorage.setItem('token', u);
        this.subjLoggedIn$.next(true);
        // this.subjUser$.next(u);
      })
    );
  }

  login(model: any): Observable<User> {
    return this.http
      .post<User>(`${this.baseURL}/login`, model)
      .pipe(
        tap((u: User) => {
          localStorage.setItem('userid', u.usmO_SKU_USUARIO);
          localStorage.setItem('username', u.usmO_NOM_USUARIO);
          // sessionStorage.setItem('userid', u.usmO_SKU_USUARIO);
          // sessionStorage.setItem('username', u.usmO_NOM_USUARIO);
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

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token && !this.subjLoggedIn$.value) {
      return this.checkTokenValidation();
    }
    return this.subjLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(true);
    } else {
      this.logout();
      return of(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }

}
