import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidade } from '../_models/Unidade';
import { Marca } from '../_models/Marca';
import { Regional } from '../_models/Regional';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  // baseURL = 'http://10.1.255.23:83/api/Unidade';
  // baseURLMarca = 'http://10.1.255.23:83/api/Marca';
  baseURL = 'https://localhost:44385/api/Unidade';
  baseURLMarca = 'https://localhost:44385/api/Marca';
  baseURLRegional = 'https://localhost:44385/api/Regional';

  constructor(private http: HttpClient) { }

  getAllUnidade(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(this.baseURL);
  }

  getAllMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseURLMarca);
  }

  getAllRegional(): Observable<Regional[]> {
    return this.http.get<Regional[]>(this.baseURLRegional);
  }

  getUnidadeById(id: number): Observable<Unidade> {
    return this.http.get<Unidade>(`${this.baseURL}/${id}`);
  }

  postUnidade(unidade: Unidade) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.baseURL, unidade, httpOptions);
  }

  putUnidade(unidade: Unidade) {
    return this.http.put(`${this.baseURL}/${unidade.uniD_COD_UNIDADE}`, unidade);
  }

  deleteUnidade(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
