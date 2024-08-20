import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArmazon } from '../models/armazon';
import { ArmazonCotizacionModel, IArmazonCotizacion } from '../models/armazon.cotizacion';

@Injectable({
  providedIn: 'root'
})
export class ArmazonCotizacionService {

  baseUrl: string = environment.baseUrl + 'ArmazonCotizacion'

  constructor(private http: HttpClient) { }

  GetAll(id:number): Observable<IArmazonCotizacion[]> {
    return this.http.get<IArmazonCotizacion[]>(`${this.baseUrl}/List/${id}`);
  }

  GetById(id: number): Observable<IArmazonCotizacion> {
    return this.http.get<IArmazonCotizacion>(`${this.baseUrl}/${id}`)
  }

  Agregar(armazon: ArmazonCotizacionModel): Observable<ArmazonCotizacionModel> {
    return this.http.post<ArmazonCotizacionModel>(`${this.baseUrl}`, armazon);
  }

  Editar(armazon: IArmazonCotizacion): Observable<IArmazonCotizacion> {
    return this.http.put<IArmazonCotizacion>(`${this.baseUrl}/${armazon.armazonid}`, armazon);
  }

  Eliminar(id: number): Observable<IArmazonCotizacion> {
    return this.http.delete<IArmazonCotizacion>(`${this.baseUrl}/${id}`);
  }
}
