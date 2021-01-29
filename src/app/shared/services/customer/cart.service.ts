import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = "http://user-dashboard.qburst.build:3002/cart";
  imageUrlPrefix = "http://user-dashboard.qburst.build/user_dashboard/";
  
  constructor(private http: HttpClient) { }

  getCartItems() {
    return this.http.get(this.baseUrl).pipe(
      take(1),
      map((responseData: any) => {
        return responseData.data[0].Products.map(
          eachData => Object.assign(eachData, {image: this.imageUrlPrefix + eachData.image})
        )
      })
    )
  }

  addCartItem(productDetails){
    this.http.post(`${this.baseUrl}/add`, productDetails).subscribe(res => console.log('Item added'))
  }

  editCartItem() {
    
  }

  removeCartItem() {

  }

}
