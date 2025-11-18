import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

export const loginGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return from(authService.isAuthenticated()).pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        // Si ya está autenticado, redirigir al dashboard
        router.navigate(['/dashboard']);
        return false;
      } else {
        // Si no está autenticado, permitir acceso al login
        return true;
      }
    }),
    catchError(() => {
      // En caso de error, permitir acceso al login
      return from([true]);
    })
  );
};
