import { Component } from '@angular/core';
import { IUsuario } from '../../auth/interfaces/user-interface';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css',
    standalone: false
})
export class PerfilComponent {

  usuario: IUsuario = {} as IUsuario;

  constructor(private authService: AuthService,
    private service: UsuarioService) { }

  ngOnInit() {
    let id = this.GetUsuario();
    this.obtenerPorId(id);
  }
  
  GetUsuario():number {
    var us = this.authService.user
    return us.id;
  }

  obtenerPorId(id: number): void {
    this.service.GetById(id).subscribe({
      next: (usuario) => { this.usuario = usuario },
      complete: () => { },
      error: (err) => {
        console.log(err.error);
      }
    })
  }
}
