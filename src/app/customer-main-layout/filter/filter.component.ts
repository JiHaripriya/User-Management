import { Options } from '@angular-slider/ngx-slider';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
  categoryList;
  subscription: Subscription;

  value: number = 50;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 40000,
    step: 1000,
  };

  constructor(
    private categoryServices: CategoryServices,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = this.categoryServices
      .getAllCategories()
      .subscribe((data) => {
        this.categoryList = data.map((eachCategory) =>
          Object.assign({}, eachCategory, { isCollapsed: true })
        );
      });
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('categoryData'))?.length > 0) {
      this.categoryList = JSON.parse(localStorage.getItem('categoryData'));
      localStorage.removeItem('categoryData');
    }
  }

  chooseCategory(catId: Number) {
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

  loadSubcategoryProducts(categoryName: string, subcategoryName: string) {
    this.categoryServices.loadSubcategory.next({
      status: true,
      categoryName: categoryName,
      subcategoryName: subcategoryName,
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryName, subcategory: subcategoryName },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
