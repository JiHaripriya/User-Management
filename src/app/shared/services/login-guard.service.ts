import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/home/dashboard');
      return false;
    }
    return true;
  }
}
