import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Marca } from '../_models/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private baseURL = environment.baseUrl + '/api/Marca';

  constructor(private http: HttpClient) { }

  getAllMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseURL);
  }

  getMarcaById(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.baseURL}/${id}`);
  }

  postMarca(marca: Marca) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.baseURL, marca, httpOptions);
  }

  putMarca(marca: Marca) {
    return this.http.put(`${this.baseURL}/${marca.marC_COD_MARCA}`, marca);
  }

  deleteMarca(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
