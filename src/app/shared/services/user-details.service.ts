import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserDetails } from '../models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  isLoaded = new Subject<boolean>();
  reloadComponent = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  addUser(userData: UserDetails) {
    this.http
      .post(
        'https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json',
        userData
      )
      .subscribe((res) => {
        console.log(res);
        this.reloadComponent.next(true);
      });
  }

  fetchUserList() {
    return this.http
      .get(
        'https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json'
      )
      .pipe(
        take(1),
        map((responseData) => {
          const userDetailsArray: UserDetails[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              userDetailsArray.push({ ...responseData[key] });
            }
          }
          return userDetailsArray.filter((user) => user.role !== 'admin');
        })
      );
  }

  fetchUserDetails(email: string) {
    return this.http
      .get(
        `https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json?orderBy="email"&equalTo="${email}"`
      )
      .pipe(
        take(1),
        map((responseData) => {
          let userDetailsArray: UserDetails;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              userDetailsArray = { ...responseData[key] };
            }
          }
          return userDetailsArray;
        })
      );
  }
}
