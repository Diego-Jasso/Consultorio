import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app-routing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { bearerTokenInterceptor } from './Inteceptors/bearer-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withComponentInputBinding()),
  provideHttpClient(withInterceptors([bearerTokenInterceptor])),
  provideAnimations(),
  provideToastr({ positionClass: 'toast-bottom-right', timeOut: 1500 }), provideAnimationsAsync(),
  ]
};
