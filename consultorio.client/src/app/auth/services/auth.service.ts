import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { user } from '../interfaces/us-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/res-interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { IUsuario } from '../interfaces/user-interface';
import { ILogin } from '../interfaces/login-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: user;

  get user() {
    return { ...this._user }
  }
  constructor(private http: HttpClient) { }

  register(usuario: IUsuario) {
    const URL = `${this.baseUrl}auth/new`;

    return this.http.post<AuthResponse>(URL, usuario)
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

  login(log: ILogin) {
    const URL = `${this.baseUrl}auth`;

    return this.http.post<AuthResponse>(URL, log)
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
          if (res.ok) {
            localStorage.setItem('token', res.token!);
            this._user = {
              id: res.id!,
              usname: res.usname!
            }
          }
          return res.ok;
        }),
        catchError(err => of(false))
      )
  }

  logOut() {
    localStorage.clear();
  }

}
