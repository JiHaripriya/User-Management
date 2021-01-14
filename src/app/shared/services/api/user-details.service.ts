import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserDetails } from '../../models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  isLoaded = new Subject<boolean>();
  reloadComponent = new Subject<boolean>();
  baseUrl = "http://user-dashboard.qburst.build:3002/user";

  constructor(private http: HttpClient) {}

  addUser(userData: UserDetails) {
    this.http
      .post(`${this.baseUrl}`, userData)
      .subscribe((res) => {
        console.log("New user added!");
        this.reloadComponent.next(true);
      });
  }

  fetchUserList() {
    return this.http.get(`${this.baseUrl}`).pipe(
      take(1),
      map((responseData: { [index: string]: any }) => {
        return responseData.data
      })
    );
  }

  updateUser(userData: UserDetails, id: number) {
    this.http
      .put(`${this.baseUrl}/${id}`, userData)
      .subscribe((res) => {
        console.log("Details updated!");
        this.reloadComponent.next(true);
      });
  }

  updateOwnDetails(userData: UserDetails) {
    this.http
      .put(`${this.baseUrl}`, userData)
      .subscribe((res) => {
        console.log("Details updated!");
        this.reloadComponent.next(true);
      });
  }

  deleteUser(id: number) {
    this.http
      .delete(`${this.baseUrl}/delete/${id}`)
      .subscribe((res) => {
        console.log("User deleted");
        this.reloadComponent.next(true);
      });
  }

  // fetchUserDetails(email: string or token: string) for ROLE FETCH
}
