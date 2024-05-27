import { Component, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ILogin } from '../../interfaces/login-interface';
import { validarCamposRequeridos } from '../../../compartido/utilerias';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router,
    private authService: AuthService,
  private toastr: ToastrService) {
  }

  logform: ILogin = {} as ILogin;

  login(form: NgForm) {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.authService.login(this.logform)
      .subscribe(res => {
        if (res.ok === true) {
          this.router.navigateByUrl('layout');
          this.toastr.success(this.logform.usname, 'Ingreso correcto');
        } else {
          this.toastr.error(res.message, 'Error', {
            timeOut: 4000,
            progressAnimation: 'increasing'
          })
        }
      })
  }
}
