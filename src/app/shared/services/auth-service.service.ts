import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';
import { UserDetails } from '../models/user-details.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<UserDetails>(null);

  constructor(private http: HttpClient, private route: Router) {}

  isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('userData'))?.token;
    // Check whether the token is expired and return true or false
    if (token) return true;
    else return false;
  }

  signup(email: string) {
    return this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDof_8nFmAqX8kfrMfa86DehAv6HeE86YE',
        {
          email: email,
          password: 'password',
          returnSecureToken: true,
        }
      )
      .subscribe((res) => console.log(res));
  }

  emailVerification(email: string) {
    return this.http.post<any>(
      'http://user-dashboard.qburst.build:3002/user/check',
      {
        email: email,
      }
    );
  }

  // Password page  POST request to /user/login
  login(email: string, password: string) {
    return this.http
      .post<any>('http://user-dashboard.qburst.build:3002/user/login', {
        email: email,
        password: password,
      })
      .pipe(
        // catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.data.loggedUser.firstname,
            resData.data.loggedUser.lastname,
            resData.data.loggedUser.email,
            resData.data.role,
            resData.data.loggedUser.status,
            resData.data.loggedUser.token,
            resData.data.id
          );
        })
      );
  }

  autoLogin() {
    // const userData: {
    //   email: string;
    //   id: string;
    //   _token: string;
    //   _tokenExpirationDate: string;
    // } = JSON.parse(localStorage.getItem('userData'));
    // if (!userData) {
    //   return;
    // }
    // const loadedUser = new User(
    //   userData.email,
    //   userData.id,
    //   userData._token,
    //   new Date(userData._tokenExpirationDate)
    // );
    // if (loadedUser.token) {
    //   this.user.next(loadedUser);
    // }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    // localStorage.removeItem('userDetails');
    this.route.navigate(['/login']);
  }

  private handleAuthentication(
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    status: string,
    token: string,
    id: number
  ) {
    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserDetails(
      firstname,
      lastname,
      email,
      role,
      status,
      token,
      id
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
