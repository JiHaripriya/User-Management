import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserDetailsService } from '../api/user-details.service';

@Injectable({
  providedIn: 'root',
})
export class RoleResolverService implements Resolve<string> {
  constructor(private userDetailsApi: UserDetailsService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let userDetails = await this.userDetailsApi
    //   .fetchUserDetails(JSON.parse(localStorage.getItem('userDetails'))?.email)
    //   .toPromise();
    console.log('Inside role guard')
    let userDetails = JSON.parse(localStorage.getItem('userData'));
    return userDetails.role;
  }
}
