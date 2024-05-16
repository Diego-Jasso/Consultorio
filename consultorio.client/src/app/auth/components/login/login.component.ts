import { Component, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup = this.fb.group({
    usname: ['',Validators.required],
    pass: ['', Validators.required]
  });
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
  }

  login(): void  {
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    this.router.navigateByUrl('/layout');
  }
}
