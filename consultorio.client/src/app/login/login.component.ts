import { Component, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  constructor(private router:Router) {
    this.loginForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
  

  login(): void  {
    this.router.navigate(['layout/dashboard']);
  }
}
