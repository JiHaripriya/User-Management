import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface ProductStatus {
  status: boolean;
  categoryName?: string;
  subcategoryName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryServices {
  baseUrl = 'http://user-dashboard.qburst.build:3002';
  imageUrlPrefix = 'http://user-dashboard.qburst.build/user_dashboard/';
  loadCategory = new Subject<ProductStatus>();
  loadSubcategory = new Subject<ProductStatus>();

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

  productsUnderCategory(category: String) {
    return this.http
      .get(`${this.baseUrl}/product?category=${category}&page=1&range=100`)
      .pipe(
        take(1),
        map((responseData: { [index: string]: any }) => {
          responseData.data.rows = responseData.data.rows.map((eachData) =>
            Object.assign(eachData, {
              image: this.imageUrlPrefix + eachData.image,
            })
          );
          return responseData.data.rows;
        })
      );
  }

  productsUnderSubcategory(subcategory: String) {
    return this.http
      .get(
        `${this.baseUrl}/product?subcategory=${subcategory}&page=1&range=100`
      )
      .pipe(
        take(1),
        map((responseData: { [index: string]: any }) => {
          responseData.data.rows = responseData.data.rows.map((eachData) =>
            Object.assign(eachData, {
              image: this.imageUrlPrefix + eachData.image,
            })
          );
          return responseData.data.rows;
        })
      );
  }
}
