import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from 'src/app/shared/services/api/product-services.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private productServices: ProductServicesService) {}

  ngOnInit(): void {
    this.product = Object.assign(JSON.parse(localStorage.getItem('product')), {
      createdAt: new Date(
        JSON.parse(localStorage.getItem('product')).createdAt
      ).toDateString(),
      updatedAt: new Date(JSON.parse(localStorage.getItem('product')).updatedAt)
        .toTimeString()
        .split(' G')[0],
    });
    // localStorage.removeItem('product');
  }
}
