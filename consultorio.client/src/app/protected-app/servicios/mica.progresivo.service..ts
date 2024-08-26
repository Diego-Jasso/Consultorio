import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { micaProgresivo } from '../models/mica';

@Injectable({
  providedIn: 'root'
})
export class MicaProgresivoService {

  baseUrl: string = environment.baseUrl + 'MicaProgresivo'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<micaProgresivo[]> {
    return this.http.get<micaProgresivo[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<micaProgresivo> {
    return this.http.get<micaProgresivo>(`${this.baseUrl}/${id}`)
  }

  Agregar(mica: micaProgresivo): Observable<micaProgresivo> {
    return this.http.post<micaProgresivo>(`${this.baseUrl}`, mica);
  }

  Editar(mica: micaProgresivo): Observable<micaProgresivo> {
    return this.http.put<micaProgresivo>(`${this.baseUrl}/${mica.id}`, mica);
  }

  Eliminar(id: number): Observable<micaProgresivo> {
    return this.http.delete<micaProgresivo>(`${this.baseUrl}/${id}`);
  }
}
