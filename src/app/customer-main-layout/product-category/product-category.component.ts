import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  constructor() { }
  images = ["01", "02", "03"].map((num) => `../../../assets/images/banner-${num}.jpg`);

  ngOnInit(): void {
  }

}
