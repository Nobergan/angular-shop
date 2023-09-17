import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): any => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (authService.token) {
    return true;
  } else {
    authService.logout();
    router.navigate(['/admin', 'login']);
  }
};
