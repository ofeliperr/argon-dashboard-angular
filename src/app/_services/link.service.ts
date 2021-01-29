import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Link } from '../_models/Link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private baseURL = environment.baseUrl + '/api/Link';

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

  postLink(link: Link) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    // return this.http
    //       .post(this.baseURL, link, httpOptions).subscribe(results => {
    //       console.log(results);
    // });

    return this.http.post(this.baseURL, link, httpOptions);
  }

  putLink(link: Link) {
    return this.http.put(`${this.baseURL}/${link.calI_SKU_LINK}`, link);
  }

  deleteLink(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
