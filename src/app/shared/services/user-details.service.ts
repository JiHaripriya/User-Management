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
        'https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6ImUwOGI0NzM0YjYxNmE0MWFhZmE5MmNlZTVjYzg3Yjc2MmRmNjRmYTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXVkIjoidXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXV0aF90aW1lIjoxNjA5NzM0MzcxLCJ1c2VyX2lkIjoiQ1RJWm9CMVI4Q085UXhNOUJ3eTB2amFmR0JpMSIsInN1YiI6IkNUSVpvQjFSOENPOVF4TTlCd3kwdmphZkdCaTEiLCJpYXQiOjE2MDk3MzQzNzEsImV4cCI6MTYwOTczNzk3MSwiZW1haWwiOiJoYXJpcHJpeWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhhcmlwcml5YUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.pXsGAriEL0QG6Wy7kZgHMXiTSzjiQC-U1oTCpf4tLVwWIrrY-I64KWo8FPiViZJlLQ1nl0VaCrjeHfpN0zvhVm-pRh8yMerpiP6drekobkqpT8507yMBffJrI9Vq_vC0uXrLOBeKw4zrKn3SA0UBFBmGBuyJgSYW-TFm-QWvcMyrzareGxvd6HZ5PfcC8MoCGYI-I-ZyVs8hShFcGhOfRTofujPV5QwSHM4v8GuaA6aCQ4LBO14ZPTv8H_17Uwp1fiMGhDm8JEQI-3jySwdOurCfBH1V8df-N717_QUrm0eK6ce8N9GsL8E9zVIYPcxDCFC7x5-Glk-XbXv3j2jLBQ'
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

  fetchUserDetails(token: string, email: string) {
    return this.http
      .get(
        `https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json?auth=${token}&orderBy="email"&equalTo="${email}"`
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
