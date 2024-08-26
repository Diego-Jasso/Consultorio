import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { micaBifocal } from '../models/mica';

@Injectable({
  providedIn: 'root'
})
export class MicaBifocalService {

  baseUrl: string = environment.baseUrl + 'MicaBifocal'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<micaBifocal[]> {
    return this.http.get<micaBifocal[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<micaBifocal> {
    return this.http.get<micaBifocal>(`${this.baseUrl}/${id}`)
  }

  Agregar(mica: micaBifocal): Observable<micaBifocal> {
    return this.http.post<micaBifocal>(`${this.baseUrl}`, mica);
  }

  Editar(mica: micaBifocal): Observable<micaBifocal> {
    return this.http.put<micaBifocal>(`${this.baseUrl}/${mica.id}`, mica);
  }

  Eliminar(id: number): Observable<micaBifocal> {
    return this.http.delete<micaBifocal>(`${this.baseUrl}/${id}`);
  }
}
