import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserDetailsService } from './user-details.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements Resolve<string> {
  constructor(private userDetailsApi: UserDetailsService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let userDetails = await this.userDetailsApi
    //   .fetchUserDetails(JSON.parse(localStorage.getItem('userDetails'))?.email)
    //   .toPromise();
    let userDetails = JSON.parse(localStorage.getItem('userData'));
    return userDetails.role;
  }
}
