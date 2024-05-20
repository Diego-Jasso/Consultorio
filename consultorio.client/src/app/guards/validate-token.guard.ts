import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

export const validateTokenGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);
    return authService.validateToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            router.navigateByUrl('/auth');
          }
        })
      );
}

export const canMatch: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.validateToken()
    .pipe(
      tap(valid => {
        if (!valid) {
          router.navigateByUrl('/auth');
        }
      })
    );
}
  
