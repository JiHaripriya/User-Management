import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserDetailsService } from '../api/user-details.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = 'http://user-dashboard.qburst.build:3002/cart';
  imageUrlPrefix = 'http://user-dashboard.qburst.build/user_dashboard/';

  cartItems = new Subject<Number>();

  constructor(private http: HttpClient, private reload: UserDetailsService) {}

  getCartItems() {
    return this.http.get(this.baseUrl).pipe(
      take(1),
      map((responseData: any) => {
        return responseData.data[0].Products.map((eachData) =>
          Object.assign(eachData, {
            image: this.imageUrlPrefix + eachData.image,
          })
        );
      })
    );
  }

  addCartItem(productDetails) {
    this.http
      .post(`${this.baseUrl}/add`, productDetails)
      .subscribe((res: any) =>
        res.success === 201
          ? this.reload.reloadComponent.next(true)
          : console.log(res)
      );
  }

  removeCartItem(id: number) {
    console.log(id);
    this.http
      .delete(`${this.baseUrl}/${id}`)
      .subscribe((res: any) =>
        res.success === 200
          ? this.reload.reloadComponent.next(true)
          : console.log(res)
      );
  }
}
