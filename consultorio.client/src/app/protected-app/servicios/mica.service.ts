import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imica } from '../models/mica';

@Injectable({
  providedIn: 'root'
})
export class MicaService {

  baseUrl: string = environment.baseUrl + 'Mica'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Imica[]> {
    return this.http.get<Imica[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<Imica> {
    return this.http.get<Imica>(`${this.baseUrl}/${id}`)
  }

  Agregar(mica: Imica): Observable<Imica> {
    return this.http.post<Imica>(`${this.baseUrl}`, mica);
  }

  Editar(mica: Imica): Observable<Imica> {
    return this.http.put<Imica>(`${this.baseUrl}/${mica.micaid}`, mica);
  }

  Eliminar(id: number): Observable<Imica> {
    return this.http.delete<Imica>(`${this.baseUrl}/${id}`);
  }
}
