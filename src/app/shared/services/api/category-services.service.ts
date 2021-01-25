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

  getCategoryMapping() {
    return this.http.get(`${this.baseUrl}/subcategory`).pipe(
      take(1),
      map((responseData: { [index: string]: any }) => {
        return responseData.data.map((data) => {
          return { category_id: data.id, name: data.name };
        });
      })
    );
  }

  getSubcategoryMapping() {
    return this.http.get(`${this.baseUrl}/subcategory`).pipe(
      take(1),
      map((responseData: { [index: string]: any }) => {
        let subMap = [];
        responseData.data
          .map((data) => data.Subcategories)
          .filter((data) => data.length > 0)
          .map((data) => {
            for (let eachData of data)
              subMap.push({ id: eachData.id, name: eachData.name });
          });
        return subMap;
      })
    );
  }
}
