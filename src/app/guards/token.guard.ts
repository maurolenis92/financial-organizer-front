import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

export const tokenGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return from(authService.isAuthenticated()).pipe(
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        // Si no está autenticado, redirigir al login
        router.navigate(['/login']);
        return of(false);
      }

      // Si está autenticado, verificar que tenga un token válido
      return from(authService.getCurrentUserToken()).pipe(
        map(token => {
          if (token) {
            return true;
          } else {
            // Sin token válido, redirigir al login
            console.warn('No valid token found, redirecting to login');
            router.navigate(['/login']);
            return false;
          }
        })
      );
    }),
    catchError(error => {
      console.error('Token validation error:', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
