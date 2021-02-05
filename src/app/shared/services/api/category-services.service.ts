import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Alerts } from '../../models/alert.model';

interface ProductStatus {
  status: boolean;
  categoryName?: string;
  subcategoryName?: string;
}

interface Subcategory {
  id?: number;
  name: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryServices {
  baseUrl = 'http://user-dashboard.qburst.build:3002';
  imageUrlPrefix = 'http://user-dashboard.qburst.build/user_dashboard/';
  loadCategory = new Subject<ProductStatus>();
  loadSubcategory = new Subject<ProductStatus>();
  deleteCategoryStatus = new Subject<number>();
  deleteSubcategoryStatus = new Subject<number>();
  deleteForm = new Subject<boolean>();
  reloadComponent = new Subject<boolean>();
  categoryAlerts = new Subject<Alerts>();
  hideInputField = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  async mappingFunction() {
    localStorage.setItem(
      'categoryMapping',
      JSON.stringify(await this.getCategoryMapping().toPromise())
    );
    localStorage.setItem(
      'subcategoryMapping',
      JSON.stringify(await this.getSubcategoryMapping().toPromise())
    );
  }

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

  getCategorySubcategory(url) {
    return {
      category: url
        .slice(url.indexOf('?category='), url.indexOf('&subcategory'))
        .split('=')
        .pop()
        .match(/[A-Za-z ]+/g)
        .join(' '),
      subcategory: url
        .slice(url.indexOf('&subcategory'))
        .split('&subcategory=')
        .pop()
        .match(/[A-Za-z ]+/g)
        .join(' '),
    };
  }

  getCategory(url) {
    return url
      .split('?')
      .pop()
      .split('category=')
      .pop()
      .match(/[A-Za-z ]+/g)
      .join(' ');
  }

  addCategoryNames(products) {
    const categoryMapping = JSON.parse(localStorage.getItem('categoryMapping'));
    const subcategoryMapping = JSON.parse(
      localStorage.getItem('subcategoryMapping')
    );
    return products.map((product) => {
      return Object.assign(product, {
        category_name: categoryMapping.filter(
          (data) => data.category_id === product.category_id
        )[0]?.name,
        subcategory_name: subcategoryMapping.filter(
          (data) => data.id === product.subcategory_id
        )[0]?.name,
      });
    });
  }

  createCategory(data: string) {
    this.http.post(`${this.baseUrl}/category/create`, data).subscribe(
      (res) => {
        this.categoryAlerts.next({
          type: 'success',
          message: 'Category created successfully!',
        });
        this.reloadComponent.next(true);
      },
      (error) => {
        if (error.error.error >= 400) {
          this.categoryAlerts.next({
            type: 'danger',
            message: 'Unknown error occured',
          });
        }
      }
    );
  }

  editCategory(id: number, data: string) {
    this.http.put(`${this.baseUrl}/category/${id}`, data).subscribe(
      (res: any) => {
        this.categoryAlerts.next({
          type: 'success',
          message: 'Category edited successfully!',
        });
        this.reloadComponent.next(true);
      },
      (error) => {
        console.log(error);
        if (
          error.error.error === 400 &&
          error.error.message === 'category name already exist'
        ) {
          this.categoryAlerts.next({
            type: 'warning',
            message: 'No changes made to catgory name',
          });
        }
      }
    );
  }

  deleteCategory(id: number) {
    this.http.delete(`${this.baseUrl}/category/${id}`).subscribe(
      (res: any) => {
        this.categoryAlerts.next({
          type: 'success',
          message:
            'Category and all subcategories under it deleted successfully',
        });
        this.reloadComponent.next(true);
      },
      (error) => {
        if (error.error.error >= 400) {
          this.categoryAlerts.next({
            type: 'danger',
            message: 'Unknown error occured',
          });
        }
      }
    );
  }

  createSubCategory(data: Subcategory) {
    console.log(data);
    this.http
      .post(`${this.baseUrl}/subCategory/create`, {
        name: data.name,
        category: data.category,
      })
      .subscribe(
        (res: any) => {
          this.categoryAlerts.next({
            type: 'success',
            message: res.message.split(' by ')[0] + '!',
          });
          this.reloadComponent.next(true);
        },
        (error) => {
          if (error.error.error >= 400) {
            this.categoryAlerts.next({
              type: 'danger',
              message: 'Unknown error occured',
            });
          }
        }
      );
  }

  editSubCategory(data: Subcategory) {
    this.http
      .put(`${this.baseUrl}/subCategory/${data.id}`, {
        name: data.name,
        category: data.category,
      })
      .subscribe(
        (res: any) => {
          this.categoryAlerts.next({
            type: 'success',
            message: res.message.split(' by ')[0] + '!',
          });
          this.reloadComponent.next(true);
        },
        (error) => {
          if (error.error.error >= 400) {
            this.categoryAlerts.next({
              type: 'danger',
              message: 'Unknown error occured',
            });
          }
        }
      );
  }

  deleteSubCategory(id: number) {
    this.http.delete(`${this.baseUrl}/subCategory/${id}`).subscribe(
      (res: any) => {
        this.categoryAlerts.next({
          type: 'success',
          message: res.message.split(' by ')[0] + '!',
        });
        this.reloadComponent.next(true);
      },
      (error) => {
        if (error.error.error >= 400) {
          this.categoryAlerts.next({
            type: 'danger',
            message: 'Unknown error occured',
          });
        }
      }
    );
  }
}
