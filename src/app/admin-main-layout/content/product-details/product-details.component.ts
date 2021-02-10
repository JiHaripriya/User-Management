import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor() {}

  ngOnInit(): void {
    this.product = Object.assign(JSON.parse(localStorage.getItem('product')), {
      createdAt:
        new Date(
          JSON.parse(localStorage.getItem('product')).createdAt
        ).toDateString() +
        ' ' +
        new Date(JSON.parse(localStorage.getItem('product')).createdAt)
          .toTimeString()
          .split(' G')[0],
      updatedAt:
        new Date(
          JSON.parse(localStorage.getItem('product')).updatedAt
        ).toDateString() +
        ' ' +
        new Date(JSON.parse(localStorage.getItem('product')).updatedAt)
          .toTimeString()
          .split(' G')[0],
    });
  }
}
