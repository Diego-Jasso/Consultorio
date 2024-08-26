import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IlenteDeContacto } from '../models/mica';

@Injectable({
  providedIn: 'root'
})


export class lenteDeContactoService {

  baseUrl: string = environment.baseUrl + 'LenteDeContacto'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<IlenteDeContacto[]> {
    return this.http.get<IlenteDeContacto[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<IlenteDeContacto> {
    return this.http.get<IlenteDeContacto>(`${this.baseUrl}/${id}`)
  }

  Agregar(contacto: IlenteDeContacto): Observable<IlenteDeContacto> {
    return this.http.post<IlenteDeContacto>(`${this.baseUrl}`, contacto);
  }

  Editar(contacto: IlenteDeContacto): Observable<IlenteDeContacto> {
    return this.http.put<IlenteDeContacto>(`${this.baseUrl}/${contacto.id}`, contacto);
  }

  Eliminar(id: number): Observable<IlenteDeContacto> {
    return this.http.delete<IlenteDeContacto>(`${this.baseUrl}/${id}`);
  }
}
