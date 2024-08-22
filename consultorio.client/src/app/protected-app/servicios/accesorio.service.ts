import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccesorio} from '../models/accesorio';

@Injectable({
  providedIn: 'root'
})
export class AccesorioService {

  baseUrl: string = environment.baseUrl + 'Accesorio'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<IAccesorio[]> {
    return this.http.get<IAccesorio[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<IAccesorio> {
    return this.http.get<IAccesorio>(`${this.baseUrl}/${id}`)
  }

  Agregar(acc: IAccesorio): Observable<IAccesorio> {
    return this.http.post<IAccesorio>(`${this.baseUrl}`, acc);
  }

  Editar(acc: IAccesorio): Observable<IAccesorio> {
    return this.http.put<IAccesorio>(`${this.baseUrl}/${acc.id}`, acc);
  }

  Eliminar(id: number): Observable<IAccesorio> {
    return this.http.delete<IAccesorio>(`${this.baseUrl}/${id}`);
  }
}
