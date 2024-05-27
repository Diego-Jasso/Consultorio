import { Component, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ILogin } from '../../interfaces/login-interface';

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

  validaCampos(form: NgForm) {
    Object.keys(form.controls).forEach((input) => {
      const control = form.controls[input];
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  login(form: NgForm) {
    if (!form.valid) {
      this.validaCampos(form);
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
