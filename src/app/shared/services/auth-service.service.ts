import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';
import { UserDetails } from '../models/user-details.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<UserDetails>(null);
  baseUrl = "http://user-dashboard.qburst.build:3002/user";

  constructor(private http: HttpClient, private route: Router) {}

  isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('userData'))?.token;
    // Check whether the token is expired and return true or false
    if (token) return true;
    else return false;
  }

  emailVerification(email: string) {
    return this.http.post<any>(
      `${this.baseUrl}/check`,
      {
        email: email,
      }
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/login`, {
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

  setOrForgotPassword(action: string, password: string, token: string) {
    this.http.put(`http://user-dashboard.qburst.build:3002/user/password`, {
      password: password
    }, {
      params: new HttpParams().set('action', action)
        .set('token', token)
    }).subscribe((res) => {
      console.log("Password set");
    });
  }

  autoLogin() {
    const userData: {
      firstname: string,
      lastname: string,
      email: string,
      role: string,
      status: string,
      token: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new UserDetails(
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.role,
      userData.status,
      userData.token
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.http.post(`${this.baseUrl}/logout`, {}).subscribe((res) => {
      console.log("Logged out");
    });
    this.user.next(null);
    localStorage.removeItem('userData');
    this.route.navigateByUrl('/login');
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
}
