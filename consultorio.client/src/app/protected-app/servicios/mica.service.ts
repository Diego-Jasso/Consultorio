import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mica } from '../models/mica';

@Injectable({
  providedIn: 'root'
})
export class MicaService {

  baseUrl: string = environment.baseUrl + 'Mica'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Mica[]> {
    return this.http.get<Mica[]>(`${this.baseUrl}`);
  }

  GetAllWithFilter(tipo:string = 'ALL'): Observable<Mica[]> {
    return this.http.get<Mica[]>(`${this.baseUrl}/Filtro/${tipo}`);
  }

  GetById(id: number): Observable<Mica> {
    return this.http.get<Mica>(`${this.baseUrl}/${id}`)
  }

  Agregar(mica: Mica): Observable<Mica> {
    return this.http.post<Mica>(`${this.baseUrl}`, mica);
  }

  Editar(mica: Mica): Observable<Mica> {
    return this.http.put<Mica>(`${this.baseUrl}/${mica.id}`, mica);
  }

  Eliminar(id: number): Observable<Mica> {
    return this.http.delete<Mica>(`${this.baseUrl}/${id}`);
  }
}
