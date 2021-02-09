import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CategoryServices } from './category-services.service';

interface PriceLimits {
  minPrice: number;
  maxPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductServicesService {
  baseUrl = 'http://user-dashboard.qburst.build:3002/product';
  imageUrlPrefix = 'http://user-dashboard.qburst.build/user_dashboard/';
  listViewSelected = new Subject<boolean>();
  collapselistView = new Subject<boolean>();
  priceFilter = new Subject<PriceLimits>();
  totalResults = new Subject<number>();
  sortedProducts = new Subject<any>();
  resetSortMenu = new Subject<boolean>();
  loadAllProducts = new Subject<boolean>();
  
  constructor(
    private http: HttpClient,
    private categoryServices: CategoryServices
  ) {}

  getAllProducts() {
    return this.http.get(`${this.baseUrl}?page=1&range=100`).pipe(
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
    return this.http.get(`${this.baseUrl}/home`).pipe(
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

  productSearch(searchItem: string) {
    return this.http
      .get(`${this.baseUrl}?search=${searchItem}&page=1&range=100`)
      .pipe(
        take(1),
        map((responseData: any) => {
          let data = responseData.data.rows.map((p) => {
            return Object.assign(p, { image: this.imageUrlPrefix + p.image });
          });
          return data;
        })
      );
  }

  ascendingSortByProperty(propertyName: string) {
    return this.http
      .get(`${this.baseUrl}?property=${propertyName}&sort=ASC&page=1&range=100`)
      .pipe(
        take(1),
        map((responseData: any) => {
          let data = responseData.data.rows.map((p) => {
            return Object.assign(p, { image: this.imageUrlPrefix + p.image });
          });
          return data;
        })
      );
  }

  descendingSortByProperty(propertyName: string) {
    return this.http
      .get(
        `${this.baseUrl}?property=${propertyName}&sort=DESC&page=1&range=100`
      )
      .pipe(
        take(1),
        map((responseData: any) => {
          let data = responseData.data.rows.map((p) => {
            return Object.assign(p, { image: this.imageUrlPrefix + p.image });
          });
          return data;
        })
      );
  }

  filterProducts(url, products) {
    if (url.includes('category=')) {
      if (url.includes('subcategory=')) {
        const names = this.categoryServices.getCategorySubcategory(url);
        return this.categoryServices
          .addCategoryNames(products)
          .filter(
            (product) =>
              product.category_name === names.category &&
              product.subcategory_name === names.subcategory
          );
      } else {
        const category = this.categoryServices.getCategory(url);
        return this.categoryServices
          .addCategoryNames(products)
          .filter((product) => product.category_name === category);
      }
    } else return this.categoryServices.addCategoryNames(products);
  }
}
