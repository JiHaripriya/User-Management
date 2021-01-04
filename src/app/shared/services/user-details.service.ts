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

  constructor(private http: HttpClient) {}

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
          return userDetailsArray;
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
