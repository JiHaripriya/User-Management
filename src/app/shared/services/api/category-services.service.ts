import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryServices {
  baseUrl = 'http://user-dashboard.qburst.build:3002';
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(`${this.baseUrl}/subcategory`).pipe(
      take(1),
      map((responseData: { [index: string]: any }) => {
        return responseData.data;
      })
    );
  }
}
