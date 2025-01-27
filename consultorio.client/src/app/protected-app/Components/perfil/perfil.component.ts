import { Component } from '@angular/core';
import { IUsuario } from '../../../auth/interfaces/user-interface';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PerfilComponent {

  usuario: IUsuario = {} as IUsuario;

  constructor(private authService: AuthService,
    private service: UsuarioService,
   private router: Router) { }

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

  registrarUsuario() {
    this.router.navigateByUrl('auth/register');
  }
}
