import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { user } from '../interfaces/us-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/res-interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: user;

  get user() {
    return {...this._user}
  }
  constructor(private http: HttpClient) { }

  register(nombre: string, aPaterno: string,aMaterno:string,nombreUsuario:string,telefono:string,correo:string, pass: string) {
    const URL = `${this.baseUrl}auth/new`;
    const body = { nombre, aPaterno, aMaterno, nombreUsuario, telefono,correo,pass };

    return this.http.post<AuthResponse>(URL, body)
      .pipe(
        tap(res => {
          console.log(res);
          if (res.ok) {
            localStorage.setItem('token', res.token!);
            this._user = {
              id: res.id!,
              usname: res.usname!
            }
          }
        }),
        map(res => res),
        catchError(err => of(err.error.message))
      );
  }

  login(id: number, pass: string) {
    const URL = `${this.baseUrl}auth`;
    const body = { id, pass };

    return this.http.post<AuthResponse>(URL, body)
      .pipe(
        tap(res => {
          if (res.ok) {
            localStorage.setItem('token', res.token!);
            this._user = {
              id: res.id!,
              usname: res.usname!
            }
          } 
        }),
        map(res => res),
        catchError(err => of(err.error.message))
      );
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}auth`;
    const headers = new HttpHeaders()
      .set('TokenKey', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(res => {
          localStorage.setItem('token', res.token!);
          this._user = {
            id: res.id!,
            usname: res.usname!
          }
          return res.ok;
        }),
        catchError(err => of(false))
        )
  }
}
