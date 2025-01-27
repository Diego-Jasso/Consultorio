import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const AUTH_ROUTES: Route[] = [{
  path: '',
  component: LoginComponent,
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'register', component: RegisterComponent
},
{
  path: '**', redirectTo: 'login'
}
];
