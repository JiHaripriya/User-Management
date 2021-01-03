import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './api.service';
import { UserDetails } from './user-details.model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchUserDetails() {
    return this.http
      .get(
        'https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json'
      )
      .pipe(
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

}
