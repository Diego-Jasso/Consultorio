import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatch, validateTokenGuard } from './guards/validate-token.guard';
import { HeaderComponent } from './protected-app/header/header.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'layout',
    loadChildren: () => import('./protected-app/protected-app.module').then(m => m.ProtectedAppModule)
    //canActivate: [validateTokenGuard],
    //canMatch: [canMatch]
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {bindToComponentInputs: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
