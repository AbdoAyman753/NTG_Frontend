import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  if (authService.isLoggedIn()) {
    return true;
  }
  // authService.login();
  return false;
};

export const NegateAuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  if (authService.isLoggedIn()) {
    return false;
  }
  // authService.login();
  return true;
};


