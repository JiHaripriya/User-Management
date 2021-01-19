import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserDetails } from '../../models/user-details.model';

@Injectable({
    providedIn: 'root',
})
export class ProductDetailsService {
    baseUrl = "http://user-dashboard.qburst.build:3002";

    constructor(private http: HttpClient) { }

    fetchProductList() {
        return this.http.get(`${this.baseUrl}` + '/product').pipe(
            take(1),
            map((responseData: { [index: string]: any }) => {
                return responseData.data
            })
        );
    }
}