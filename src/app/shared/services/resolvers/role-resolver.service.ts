import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleResolverService implements Resolve<string> {
  constructor() {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userDetails = JSON.parse(localStorage.getItem('userData'));
    return userDetails.role;
  }
}
