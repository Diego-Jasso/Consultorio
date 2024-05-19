import { Component, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup = this.fb.group({
    id: ['',Validators.required],
    pass: ['', Validators.required]
  });
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  private toastr: ToastrService) {
  }

  login() {
    //console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    //this.router.navigateByUrl('/layout');
    if (this.loginForm.valid) {
      const { id, pass } = this.loginForm.value;
      this.authService.login(id, pass)
        .subscribe(res => {
          if (res === true) {
            this.router.navigateByUrl('/layout');
            this.toastr.success(id, 'Ingreso correcto');
          } else {
            console.log(res);
            this.toastr.error(res, 'Error', {
              timeOut: 4000,
              progressAnimation: 'increasing'
            })
          }
        })
    } else {
      this.toastr.error('Verifique sus datos', 'Error');
    }
  }
}
