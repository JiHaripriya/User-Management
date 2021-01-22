import { Options } from '@angular-slider/ngx-slider';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

  value: number = 1000;
  highValue: number = 6000;
  options: Options = {
    floor: 0,
    ceil: 40000,
    step: 4000,
  };

  constructor(private productServices: CategoryServices) {
    this.subscription = this.productServices.getAllCategories().subscribe((data) => {
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

  chooseSubcategory(subId: Number, catId: Number) {
    alert(`${subId} + ${catId}`);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
