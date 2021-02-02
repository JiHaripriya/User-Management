import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from 'src/app/shared/services/api/product-services.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent implements OnInit {
  results;
  option;

  constructor(private productServices: ProductServicesService) {
    this.productServices.getAllProducts().subscribe((data) => {
      this.results = data.length;
    });
  }

  ngOnInit(): void {
    this.productServices.totalResults.subscribe(
      (data) => (this.results = data)
    );
  }

  onListView() {
    this.productServices.listViewSelected.next(true);
  }

  onGridView() {
    this.productServices.collapselistView.next(true);
  }

  sortOption(value) {
    console.log(this.option, value)
  }

  // private getCategorySubcategory(url) {
  //   return {
  //     category: url
  //       .slice(url.indexOf('?category='), url.indexOf('&subcategory'))
  //       .split('=')
  //       .pop(),
  //     subcategory: url
  //       .slice(url.indexOf('&subcategory'))
  //       .split('&subcategory=')
  //       .pop(),
  //   };
  // }

  // private getCategory(url) {
  //   return {
  //     category: url.split('?').pop().split('category=').pop(),
  //   };
  // }
}
