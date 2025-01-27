import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatch, validateTokenGuard } from './guards/validate-token.guard';
import { HeaderComponent } from './protected-app/Components/header/header.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'layout',
    loadChildren: () => import('./protected-app/protected-app-routing').then(m => m.PROTECTED_ROUTES),
    canActivate: [validateTokenGuard],
    canMatch: [canMatch]
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];
