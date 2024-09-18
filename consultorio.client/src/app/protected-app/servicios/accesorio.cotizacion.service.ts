import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArmazon } from '../models/armazon';
import { AccesorioCotizacionModel, IAccesorioCotizacion } from '../models/accesorio.cotizacion';

@Injectable({
  providedIn: 'root'
})
export class AccesorioCotizacionService {

  baseUrl: string = environment.baseUrl + 'AccesorioCotizacion'

  constructor(private http: HttpClient) { }

  GetAll(id: number): Observable<IAccesorioCotizacion[]> {
    return this.http.get<IAccesorioCotizacion[]>(`${this.baseUrl}/List/${id}`);
  }

  GetById(id: number): Observable<IAccesorioCotizacion> {
    return this.http.get<IAccesorioCotizacion>(`${this.baseUrl}/${id}`)
  }

  Agregar(accesorio: AccesorioCotizacionModel): Observable<AccesorioCotizacionModel> {
    return this.http.post<AccesorioCotizacionModel>(`${this.baseUrl}`, accesorio);
  }

  Editar(accesorio: IAccesorioCotizacion): Observable<IAccesorioCotizacion> {
    return this.http.put<IAccesorioCotizacion>(`${this.baseUrl}/${accesorio.id}`, accesorio);
  }

  Eliminar(id: number): Observable<IAccesorioCotizacion> {
    return this.http.delete<IAccesorioCotizacion>(`${this.baseUrl}/${id}`);
  }
}
