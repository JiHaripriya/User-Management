import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CategoryServices } from './category-services.service';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesService {
  baseUrl = 'http://user-dashboard.qburst.build:3002';
  imageUrlPrefix = 'http://user-dashboard.qburst.build/user_dashboard/';
  listViewSelected = new Subject<boolean>();
  collapselistView = new Subject<boolean>();

  constructor(private http: HttpClient, private categoryServices: CategoryServices) {}

  getAllProducts() {
    return this.http.get(`${this.baseUrl}/product?page=1&range=100`).pipe(
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

  getHomePageProducts() {
    return this.http.get(`${this.baseUrl}/product/home`).pipe(
      take(1),
      map((responseData: any) => {
        return responseData.data.map((p) => {
          return Object.assign({
            subcategory_name: p.name,
            products: p.Products.map((item) =>
              Object.assign(item, { image: this.imageUrlPrefix + item.image })
            ),
          });
        });
      })
    );
  }
}
