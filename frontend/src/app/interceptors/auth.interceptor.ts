import { inject } from '@angular/core';
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken: string | null = authService.getAccessToken();

    if (accessToken) {
      const headers: HttpHeaders = req.headers.append('Authorization',  `Bearer ${accessToken}`);
      const reqWithHeader = req.clone({ headers });

      return next(reqWithHeader);
    }

    return next(req);
};
