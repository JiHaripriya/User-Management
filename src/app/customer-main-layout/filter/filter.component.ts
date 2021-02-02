import { Options } from '@angular-slider/ngx-slider';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';
import { ProductServicesService } from 'src/app/shared/services/api/product-services.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
  categoryList;
  subscription: Subscription;
  selectedSubcategory;

  value: number = 50;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100000,
    step: 1000,
  };

  constructor(
    private categoryServices: CategoryServices,
    private route: ActivatedRoute,
    private router: Router,
    private productServices: ProductServicesService
  ) {
    this.subscription = this.categoryServices
      .getAllCategories()
      .subscribe((data) => {
        this.categoryList = data.map((eachCategory) =>
          Object.assign({}, eachCategory, { isCollapsed: true })
        );

        if (this.router.url.includes('category=')) {
          if (this.router.url.includes('subcategory=')) {
            const names = this.categoryServices.getCategorySubcategory(
              this.router.url
            );
            this.categoryList.map((data) => {
              if (data.name === names.category) data.isCollapsed = false;
              const subcategory = data.Subcategories.filter(
                (item) => item.name === names.subcategory
              );
              if (subcategory.length > 0)
                this.selectedSubcategory = subcategory[0].id;
            });
          } else {
            const category = this.categoryServices.getCategory(this.router.url);
            this.categoryList.map((data) => {
              if (data.name === category) data.isCollapsed = false;
            });
          }
        }
      });
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('categoryData'))?.length > 0) {
      this.categoryList = JSON.parse(localStorage.getItem('categoryData'));
      localStorage.removeItem('categoryData');
    }
  }

  chooseCategory(catId: Number) {
    this.selectedSubcategory = -1;
    let categoryClicked;

    this.categoryList.filter((eachCategory, index) => {
      if (eachCategory.id === catId) categoryClicked = index;
    });
    this.categoryList[categoryClicked].isCollapsed = this.categoryList[
      categoryClicked
    ].isCollapsed
      ? false
      : true;
    this.categoryList = this.categoryList.map((eachCategory) => {
      if (eachCategory.id !== catId)
        return Object.assign({}, eachCategory, { isCollapsed: true });
      return eachCategory;
    });

    localStorage.setItem('categoryData', JSON.stringify(this.categoryList));
    this.productServices.resetSortMenu.next(true);
    this.ngOnInit();
  }

  loadCategoryProducts(categoryName: string) {
    this.categoryServices.loadCategory.next({
      status: true,
      categoryName: categoryName,
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryName },
    });
  }

  loadSubcategoryProducts(
    categoryName: string,
    subcategoryName: string,
    id: number
  ) {
    this.selectedSubcategory = id;

    this.categoryServices.loadSubcategory.next({
      status: true,
      categoryName: categoryName,
      subcategoryName: subcategoryName,
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryName, subcategory: subcategoryName },
    });
    this.productServices.resetSortMenu.next(true);
  }

  priceFilter() {
    this.productServices.priceFilter.next({
      minPrice: this.value,
      maxPrice: this.highValue,
    });
  }

  clearFilter() {
    this.router.navigate([], {queryParams: null});
    this.productServices.loadAllProducts.next(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
