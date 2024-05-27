import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from '../../interfaces/user-interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  usuario: IUsuario = {} as IUsuario;
  constructor(private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void { }

 validaCampos(form: NgForm) {
    Object.keys(form.controls).forEach((input) => {
      const control = form.controls[input];
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  register(form:NgForm) {
    if (!form.valid) {
      this.validaCampos(form);
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
