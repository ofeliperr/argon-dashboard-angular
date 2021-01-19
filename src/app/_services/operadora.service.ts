import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operadora } from '../_models/Operadora';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {

  // baseURL = 'http://10.1.255.23:83/api/Operadora';
  baseURL = 'https://localhost:44385/api/Operadora';

  constructor(private http: HttpClient) { }

  getAllOperadora(): Observable<Operadora[]> {
    return this.http.get<Operadora[]>(this.baseURL);
  }

  getOperadoraById(id: number): Observable<Operadora> {
    return this.http.get<Operadora>(`${this.baseURL}/${id}`);
  }

  postOperadora(operadora: Operadora) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.baseURL, operadora, httpOptions);
  }

  putOperadora(operadora: Operadora) {
    return this.http.put(`${this.baseURL}/${operadora.opeR_COD_OPERADORA}`, operadora);
  }

  deleteOperadora(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
