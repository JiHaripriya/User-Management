import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../api/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      let userDetails = JSON.parse(localStorage.getItem('userData'));
      userDetails.role === 'user' ? this.router.navigateByUrl('/user') : this.router.navigateByUrl('/admin/dashboard');
      return false;
    }
    return true;
  }
}
