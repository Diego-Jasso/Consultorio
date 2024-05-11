import { Inject, Injectable } from '@angular/core';
import { ambiente } from '../../ambientes/ambiente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iarmazon, armazon } from '../models/armazon';

@Injectable({
  providedIn: 'root'
})
export class ArmazonService {

  baseUrl: string = ambiente.aprUrl + 'Armazon'

  constructor(private http: HttpClient) { }

  GetArmazones(): Observable<armazon[]> {
    return this.http.get<armazon[]>(`${this.baseUrl}`);
  }

  GetId(id:number): Observable<armazon> {
    return this.http.get<armazon>(`${this.baseUrl}/${id}`)
  }

  InsertArmazon(armazon: Iarmazon): Observable<armazon> {
    return this.http.post<armazon>(`${this.baseUrl}`, armazon);
  }

  UpdateArmazon(armazon: armazon): Observable<armazon> {
    return this.http.put<armazon>(`${this.baseUrl}/${armazon.armazonid}`, armazon);
  }

  DeleteArmazon(id: number): Observable<armazon> {
    return this.http.delete<armazon>(`${this.baseUrl}/${id}`);
  }
}
