import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  categories = [
    {
      id: 1,
      name: 'clothing',
      createdAt: '2021-01-15T06:45:21.000Z',
      updatedAt: '2021-01-15T06:45:21.000Z',
      Subcategories: [
        {
          id: 1,
          name: 'Tshirts',
          category_id: 1,
          createdAt: '2021-01-15T06:45:21.000Z',
          updatedAt: '2021-01-15T06:45:21.000Z',
        },
      ],
    },
    {
      id: 3,
      name: 'footwear',
      createdAt: '2021-01-15T06:51:55.000Z',
      updatedAt: '2021-01-15T06:51:55.000Z',
      Subcategories: [
        {
          id: 2,
          name: 'casual',
          category_id: 3,
          createdAt: '2021-01-15T06:52:23.000Z',
          updatedAt: '2021-01-15T06:52:23.000Z',
        },
        {
          id: 3,
          name: 'formals',
          category_id: 3,
          createdAt: '2021-01-15T06:52:23.000Z',
          updatedAt: '2021-01-15T06:52:23.000Z',
        },
      ],
    },
  ];

  categoryList = this.categories.map((eachCategory) =>
    Object.assign({}, eachCategory, { isCollapsed: true })
  );

  constructor() {}

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('categoryData'))?.length > 0)
      this.categoryList = JSON.parse(localStorage.getItem('categoryData'));
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
}
