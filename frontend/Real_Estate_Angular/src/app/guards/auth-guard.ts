import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();

  if (token) {
    return true; // allow access
  } else {
    router.navigate(['/login']); // redirect if not logged in
    return false;
  }
};