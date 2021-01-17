import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<boolean>{

  hasEnteredEmail: boolean = false;
  emailEnterStatus = new Subject<boolean>();

  constructor() {
    this.emailEnterStatus.subscribe(
      status => this.hasEnteredEmail = status
    )
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.hasEnteredEmail
  }
}
