import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArmazon } from '../models/armazon';

@Injectable({
  providedIn: 'root'
})
export class MicaService {

  baseUrl: string = environment.baseUrl + 'Armazon'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<IArmazon[]> {
    return this.http.get<IArmazon[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<IArmazon> {
    return this.http.get<IArmazon>(`${this.baseUrl}/${id}`)
  }

  Agregar(armazon: IArmazon): Observable<IArmazon> {
    return this.http.post<IArmazon>(`${this.baseUrl}`, armazon);
  }

  Editar(armazon: IArmazon): Observable<IArmazon> {
    return this.http.put<IArmazon>(`${this.baseUrl}/${armazon.armazonid}`, armazon);
  }

  Eliminar(id: number): Observable<IArmazon> {
    return this.http.delete<IArmazon>(`${this.baseUrl}/${id}`);
  }
}
