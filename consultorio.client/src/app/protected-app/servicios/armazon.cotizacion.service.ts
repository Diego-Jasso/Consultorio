import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArmazon } from '../models/armazon';
import { ArticuloCotizacionModel, IArticuloCotizacion } from '../models/armazon.cotizacion';

@Injectable({
  providedIn: 'root'
})
export class ArticuloCotizacionService {

  baseUrl: string = environment.baseUrl + 'ArticuloCotizacion'

  constructor(private http: HttpClient) { }

  GetAll(id: number): Observable<ArticuloCotizacionModel[]> {
    return this.http.get<ArticuloCotizacionModel[]>(`${this.baseUrl}/List/${id}`);
  }

  GetById(id: number): Observable<ArticuloCotizacionModel> {
    return this.http.get<ArticuloCotizacionModel>(`${this.baseUrl}/${id}`)
  }

  Agregar(armazon: ArticuloCotizacionModel): Observable<ArticuloCotizacionModel> {
    return this.http.post<ArticuloCotizacionModel>(`${this.baseUrl}`, armazon);
  }

  Editar(armazon: ArticuloCotizacionModel): Observable<ArticuloCotizacionModel> {
    return this.http.put<ArticuloCotizacionModel>(`${this.baseUrl}/${armazon.armazonid}`, armazon);
  }

  Eliminar(id: number): Observable<ArticuloCotizacionModel> {
    return this.http.delete<ArticuloCotizacionModel>(`${this.baseUrl}/${id}`);
  }
}
