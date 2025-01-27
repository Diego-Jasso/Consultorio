import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
    const authToken = localStorage.getItem('token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next(authReq).pipe(
      tap({
        next: () => { },
        error: (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            console.log(err);
            router.navigate(['/auth']);
          }
        },
      })
    );
};
