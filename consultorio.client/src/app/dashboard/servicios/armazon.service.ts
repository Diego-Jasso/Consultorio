import { Inject, Injectable } from '@angular/core';
import { ambiente } from '../../../ambientes/ambiente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArmazonService {

  baseUrl: string = ambiente.aprUrl + 'Armazon/'

  constructor(private http: HttpClient) { }

  GetArmazones(): Observable<any> {
    return this.http.get(`${this.baseUrl}GetArmazones`);
  }
}
