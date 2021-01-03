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
        'https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4MGU0NWJlNGIzMTE4MzA5M2RhNzUyYmIyZGU5Y2RjYTNlNmU4ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXVkIjoidXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXV0aF90aW1lIjoxNjA5NjkyMDY4LCJ1c2VyX2lkIjoiRTIzVnl2NFl6bVppOG1RcWFqTHNPdlIzdUxoMiIsInN1YiI6IkUyM1Z5djRZem1aaThtUXFhakxzT3ZSM3VMaDIiLCJpYXQiOjE2MDk2OTIwNjgsImV4cCI6MTYwOTY5NTY2OCwiZW1haWwiOiJoYXJpcHJpeWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhhcmlwcml5YUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.dL5NanO2rsb2-KSRsqahO3WwlyT0UENXFEipkw_mmsEN1e1xoTilU4_5fhGfyXJF8hdEGE8GywC_nD1NfagCt7-yMTPOk3LfR6TjPes54Z9Rz3DgWu_inFso3OCUe5l5pmeQODXAS1J5WSNXRNAIdwyh5UwO8Vy8iPFcIPh26ML_Igr6RSk7B-Gv_fcxBcGiS6W15yQqOqaRd-K3HNso0-PCTR-xgMGn0cla4FP37TflNC73SrUwsPwh_KGU9akOzRFaVJ89PBczNTJpQO3fa15EzNAEqzAniwdBVOhlFNFTeLaZNGtBe9187nD31BQWfvaIpXCtExp831F164raSw'
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
    return this.http.get(
      `https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4MGU0NWJlNGIzMTE4MzA5M2RhNzUyYmIyZGU5Y2RjYTNlNmU4ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXVkIjoidXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXV0aF90aW1lIjoxNjA5NjkyMDY4LCJ1c2VyX2lkIjoiRTIzVnl2NFl6bVppOG1RcWFqTHNPdlIzdUxoMiIsInN1YiI6IkUyM1Z5djRZem1aaThtUXFhakxzT3ZSM3VMaDIiLCJpYXQiOjE2MDk2OTIwNjgsImV4cCI6MTYwOTY5NTY2OCwiZW1haWwiOiJoYXJpcHJpeWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhhcmlwcml5YUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.dL5NanO2rsb2-KSRsqahO3WwlyT0UENXFEipkw_mmsEN1e1xoTilU4_5fhGfyXJF8hdEGE8GywC_nD1NfagCt7-yMTPOk3LfR6TjPes54Z9Rz3DgWu_inFso3OCUe5l5pmeQODXAS1J5WSNXRNAIdwyh5UwO8Vy8iPFcIPh26ML_Igr6RSk7B-Gv_fcxBcGiS6W15yQqOqaRd-K3HNso0-PCTR-xgMGn0cla4FP37TflNC73SrUwsPwh_KGU9akOzRFaVJ89PBczNTJpQO3fa15EzNAEqzAniwdBVOhlFNFTeLaZNGtBe9187nD31BQWfvaIpXCtExp831F164raSw&orderBy="email"&equalTo="${email}"`
    ).pipe(
      take(1),
      map(
        (responseData) => {
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
