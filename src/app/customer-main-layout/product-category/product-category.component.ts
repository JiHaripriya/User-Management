import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServicesService } from 'src/app/shared/services/api/product-services.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCategoryComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productServices: ProductServicesService
  ) {}
  images = ['01', '02', '03'].map(
    (num) => `../../../assets/images/banner-${num}.jpg`
  );

  featureList = ['01', '02', '03', '01'].map(
    (num) => `../../../assets/images/banner-${num}.jpg`
  );
  productList;

  ngOnInit(): void {
    this.productServices.getHomePageProducts().subscribe((data) => {
      this.productList = data;
      let categoryMapping = JSON.parse(localStorage.getItem('categoryMapping'));
      this.productList = this.productList.map((category) => {
        return Object.assign(category, {
          products: category.products.map((eachProduct) => {
            return Object.assign(eachProduct, {
              category_name: categoryMapping.filter(
                (data) => data.category_id === eachProduct.category_id
              )[0]?.name,
            });
          }),
        });
      });
    });
  }

  gotToShop(category:string, subcategory: string) {
    // Take to category wise product listing later
    this.router.navigate(['user', 'shop'], {queryParams: {category: category, subcategory: subcategory}});
  }
}
