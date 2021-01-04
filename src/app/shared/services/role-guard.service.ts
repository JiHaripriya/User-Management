import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Subject } from 'rxjs';
import { UserDetailsService } from './user-details.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements Resolve<string> {
  userRole: string = '';

  constructor(private userDetailsApi: UserDetailsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.userDetailsApi
      .fetchUserDetails(JSON.parse(localStorage.getItem('userDetails'))?.email)
      .subscribe(
        (data) => (this.userRole = JSON.parse(JSON.stringify(data)).role)
      );
    return this.userRole;
  }
}
