import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return from(authService.isAuthenticated()).pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        // Redirigir al login si no está autenticado
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      // En caso de error, redirigir al login
      router.navigate(['/login']);
      return from([false]);
    })
  );
};
