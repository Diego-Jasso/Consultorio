import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { micaMonofocal } from '../models/mica';

@Injectable({
  providedIn: 'root'
})
export class MicaMonofocalService {

  baseUrl: string = environment.baseUrl + 'MicaMonofocal'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<micaMonofocal[]> {
    return this.http.get<micaMonofocal[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<micaMonofocal> {
    return this.http.get<micaMonofocal>(`${this.baseUrl}/${id}`)
  }

  Agregar(mica: micaMonofocal): Observable<micaMonofocal> {
    return this.http.post<micaMonofocal>(`${this.baseUrl}`, mica);
  }

  Editar(mica: micaMonofocal): Observable<micaMonofocal> {
    return this.http.put<micaMonofocal>(`${this.baseUrl}/${mica.id}`, mica);
  }

  Eliminar(id: number): Observable<micaMonofocal> {
    return this.http.delete<micaMonofocal>(`${this.baseUrl}/${id}`);
  }
}
