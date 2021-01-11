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
      .post('http://user-dashboard.qburst.build:3002/user', userData)
      .subscribe((res) => {
        console.log(res);
        this.reloadComponent.next(true);
      });
  }

  fetchUserList() {
    console.log('Req sent');
    return this.http.get('http://user-dashboard.qburst.build:3002/user').pipe(
      take(1),
      map((responseData: { [index: string]: any }) => {
        return responseData.data
      })
    );
  }

  updateUser(userData: UserDetails, id: number) {
    this.http
      .put(`http://user-dashboard.qburst.build:3002/user/${id}`, userData)
      .subscribe((res) => {
        console.log(res);
        this.reloadComponent.next(true);
      });
  }

  updateOwnDetails(userData: UserDetails) {
    this.http
      .put(`http://user-dashboard.qburst.build:3002/user`, userData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteUser(id: number) {
    console.log(id);
    this.http
      .delete(`http://user-dashboard.qburst.build:3002/user/delete/${id}`)
      .subscribe((res) => {
        console.log(res);
        this.reloadComponent.next(true);
      });
  }

  // fetchUserDetails(email: string or token: string) for ROLE FETCH
}
