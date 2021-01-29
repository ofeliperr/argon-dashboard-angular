import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DashFilter } from '../_models/DashFilter';
import { Dashboard } from '../_models/Dashboard';
import { Regional } from '../_models/Regional';
import { Marca } from '../_models/Marca';
import { Unidade } from '../_models/Unidade';
import { Operadora } from '../_models/Operadora';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseURL = environment.baseUrl + '/api/Dashboard';
  private baseURLRegional = environment.baseUrl + '/api/Regional';
  private baseURLMarca = environment.baseUrl + '/api/Marca';
  private baseURLUnidade = environment.baseUrl + '/api/Unidade';
  private baseURLOperadora = environment.baseUrl + '/api/Operadora';

  constructor(private http: HttpClient) { }

  // getAll(filter: DashFilter): Observable<Regional[]> {
  //   const params: HttpParams = new HttpParams();
  //   params.set('IdMarca', filter.IdMarca.toString());
  //   params.set('IdUnidade', filter.IdUnidade.toString());

  //   return this.http.get<Regional[]>(this.baseURL);
  // }

  // public getDashboard(filter: DashFilter) {
  getDashboard(filter: DashFilter): Observable<Dashboard> {
    let params = new HttpParams();
    params = params.append('IdMarca', filter.IdMarca.toString());
    params = params.append('IdUnidade', filter.IdUnidade.toString());
    params = params.append('IdOperadora', filter.IdOperadora.toString());
    params = params.append('Data', filter.Data);
    params = params.append('Periodo', filter.Periodo);

    return this.http.get<Dashboard>(this.baseURL, {params: params});
  }

  getAllRegional(): Observable<Regional[]> {
    return this.http.get<Regional[]>(this.baseURLRegional);
  }

  getAllMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseURLMarca);
  }

  getAllUnidade(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(this.baseURLUnidade);
  }

  getAllOperadora(): Observable<Operadora[]> {
    return this.http.get<Operadora[]>(this.baseURLOperadora);
  }

}
