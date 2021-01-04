import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements Resolve<string> {

  userRole: string = "";

  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.userRole = JSON.parse(localStorage.getItem('userDetails'))?.role;
    return this.userRole;
  }
}
