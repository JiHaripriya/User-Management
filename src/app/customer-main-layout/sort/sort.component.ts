import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';
import { ProductServicesService } from 'src/app/shared/services/api/product-services.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent implements OnInit {
  results;
  option = 'Choose an option';
  selected = false;

  constructor(
    private productServices: ProductServicesService,
    private router: Router,
    private categoryServices: CategoryServices
  ) {
    this.productServices.getAllProducts().subscribe((data) => {
      this.results = data.length;
    });
  }

  ngOnInit(): void {
    this.productServices.totalResults.subscribe(
      (data) => (this.results = data)
    );

    this.productServices.resetSortMenu.subscribe(
      status => {
        if(status) {
          this.option = 'Choose an option';
          this.selected = false;
        }
     })
  }

  onListView() {
    this.productServices.listViewSelected.next(true);
  }

  onGridView() {
    this.productServices.collapselistView.next(true);
  }

  sortOption(title, value) {
    this.option = title;
    title === 'Choose an option'
      ? (this.selected = false)
      : (this.selected = true);

    if (value == 1) {
      this.productServices
        .ascendingSortByProperty('price')
        .subscribe((data) => {
          let products = data;
          products = this.productServices.filterProducts(
            this.router.url,
            products
          );
          this.productServices.sortedProducts.next(products);
        });
    } else if (value == 2) {
      this.productServices
        .descendingSortByProperty('price')
        .subscribe((data) => {
          let products = data;
          products = this.productServices.filterProducts(
            this.router.url,
            products
          );
          this.productServices.sortedProducts.next(products);
        });
    }
  }
}
