import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imica, mica } from '../models/mica';

@Injectable({
  providedIn: 'root'
})
export class MicaService {

  baseUrl: string = environment.baseUrl + 'Mica'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<mica[]> {
    return this.http.get<mica[]>(`${this.baseUrl}`);
  }

  GetById(id:number): Observable<mica> {
    return this.http.get<mica>(`${this.baseUrl}/${id}`)
  }

  Insert(mica: Imica): Observable<mica> {
    return this.http.post<mica>(`${this.baseUrl}`, mica);
  }

  Update(mica: mica): Observable<mica> {
    return this.http.put<mica>(`${this.baseUrl}/${mica.micaid}`, mica);
  }

  Delete(id: number): Observable<mica> {
    return this.http.delete<mica>(`${this.baseUrl}/${id}`);
  }
}
