import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link } from '../_models/Link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  baseURL = 'https://localhost:44385/api/Link';

  constructor(private http: HttpClient) { }

  getAllLink(): Observable<Link[]> {
    return this.http.get<Link[]>(this.baseURL);
  }

  getLinkById(id: number): Observable<Link> {
    return this.http.get<Link>(`${this.baseURL}/${id}`);
  }

  // postUpload(file: File, name: string) {
  //   const fileToUpload = file[0] as File;
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, name);

  //   return this.http.post(`${this.baseURL}/upload`, formData);
  // }

  // postEvento(evento: Evento) {
  //   return this.http.post(this.baseURL, evento);
  // }

  // putEvento(evento: Evento) {
  //   return this.http.put(`${this.baseURL}/${evento.id}`, evento);
  // }

  // deleteEvento(id: number) {
  //   return this.http.delete(`${this.baseURL}/${id}`);
  // }

}
