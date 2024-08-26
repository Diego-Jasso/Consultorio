import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tratamientosServicios } from '../models/mica';

@Injectable({
  providedIn: 'root'
})
export class TratamientosServiciosService {

  baseUrl: string = environment.baseUrl + 'TratamientosServicios'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<tratamientosServicios[]> {
    return this.http.get<tratamientosServicios[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<tratamientosServicios> {
    return this.http.get<tratamientosServicios>(`${this.baseUrl}/${id}`)
  }

  Agregar(mica: tratamientosServicios): Observable<tratamientosServicios> {
    return this.http.post<tratamientosServicios>(`${this.baseUrl}`, mica);
  }

  Editar(mica: tratamientosServicios): Observable<tratamientosServicios> {
    return this.http.put<tratamientosServicios>(`${this.baseUrl}/${mica.id}`, mica);
  }

  Eliminar(id: number): Observable<tratamientosServicios> {
    return this.http.delete<tratamientosServicios>(`${this.baseUrl}/${id}`);
  }
}
