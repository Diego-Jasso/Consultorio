import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    aPaterno: ['', Validators.required],
    aMaterno: ['', Validators.required],
    usname: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', Validators.required],
    pass: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) {
  }

  register() {
    const { usname, id, pass } = this.loginForm.value;
    this.authService.register(usname, id, pass)
      .subscribe(res => {
        if (res.ok === true) {
          this.router.navigateByUrl('/layout');
          this.toastr.success(id + " " + usname, "Registro Correcto");
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
