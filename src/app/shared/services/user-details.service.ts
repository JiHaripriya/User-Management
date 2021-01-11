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
    console.log("Req sent");
    return this.http.get('http://user-dashboard.qburst.build:3002/user')
    .pipe(
      take(1),
      map((responseData: {[index:string]: any}) => {
        console.log(responseData.data.filter((user) => user.Role.name !== 'admin'))
        return responseData.data.filter((user) => user.Role.name !== 'admin');
      })
    );
  }

  // fetchUserDetails(email: string or token: string) for ROLE FETCH 
}
