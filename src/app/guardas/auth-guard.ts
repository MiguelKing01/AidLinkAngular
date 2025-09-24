import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (state.url === '/principal') {
    return true;
  }

  if (!router.getCurrentNavigation()) {
    router.navigateByUrl('/principal');
    return false;
  }

  return true;
};


