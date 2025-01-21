import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from '../../interfaces/user-interface';
import { validarCamposRequeridos } from '../../../compartido/utilerias';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: false
})
export class RegisterComponent implements OnInit{

  usuario: IUsuario = {} as IUsuario;
  constructor(private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void { }

  register(form:NgForm) {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.authService.register(this.usuario)
      .subscribe(res => {
        if (res.ok === true) {
          this.router.navigateByUrl('layout');
          this.toastr.success(this.usuario.nombreUsuario, "Registrado Correctamente");
        } else {
          console.log(res);
          this.toastr.error(res.message, 'Error', {
            timeOut: 4000,
            progressAnimation: 'increasing'
          });
        }
      })
  }
}
