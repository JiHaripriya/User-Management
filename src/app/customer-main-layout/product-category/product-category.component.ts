import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCategoryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  images = ['01', '02', '03'].map(
    (num) => `../../../assets/images/banner-${num}.jpg`
  );

  featureList = ['01', '02', '03', '01'].map(
    (num) => `../../../assets/images/banner-${num}.jpg`
  );


  ngOnInit(): void {}

  gotToShop() {
    // Take to category wise product listing later
    this.router.navigateByUrl('user/shop');
  }
}
