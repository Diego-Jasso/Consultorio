import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICotizacion } from '../models/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  baseUrl: string = environment.baseUrl + 'Cotizacion'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<ICotizacion[]> {
    return this.http.get<ICotizacion[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<ICotizacion> {
    return this.http.get<ICotizacion>(`${this.baseUrl}/${id}`)
  }

  Agregar(cotizacion: ICotizacion): Observable<ICotizacion> {
    return this.http.post<ICotizacion>(`${this.baseUrl}`, cotizacion);
  }

  Editar(cotizacion: ICotizacion): Observable<ICotizacion> {
    return this.http.put<ICotizacion>(`${this.baseUrl}/${cotizacion.cotizacionid}`, cotizacion);
  }

  Eliminar(id: number): Observable<ICotizacion> {
    return this.http.delete<ICotizacion>(`${this.baseUrl}/${id}`);
  }
}
