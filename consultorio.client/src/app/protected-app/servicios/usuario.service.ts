import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IUsuario } from "../../auth/interfaces/user-interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = environment.baseUrl + 'Usuario'

  constructor(private http: HttpClient) { }

  GetAll(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.baseUrl}`);
  }

  GetById(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.baseUrl}/${id}`)
  }

  Agregar(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.baseUrl}`, usuario);
  }

  Editar(usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.baseUrl}/${usuario.usuarioid}`, usuario);
  }

  Eliminar(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(`${this.baseUrl}/${id}`);
  }
}
