import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categoryList;
  editCategory = false;
  editsubCategory = false;
  categoryForm: FormGroup;
  subcategoryForm: FormGroup;
  selectedCategory = -1;
  selectedSubcategory = -1;
  showInputField = false;
  searchItem;
  deleteForm = false;
  reloadSubscription: Subscription;
  dataSubscription: Subscription;
  subscription: Subscription;
  inputSubscription: Subscription;

  constructor(private catServices: CategoryServices) {}

  ngOnInit(): void {
    this.reloadSubscription = this.catServices.reloadComponent.subscribe(
      (status) => {
        if (status === true) this.ngOnInit();
        this.reloadSubscription.unsubscribe();
      }
    );

    this.dataSubscription = this.catServices
      .getAllCategories()
      .subscribe((res) => (this.categoryList = res));

    this.categoryForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-za-z ]+'),
      ]),
    });

    this.subcategoryForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-za-z ]+'),
      ]),
    });

    this.subscription = this.catServices.deleteForm.subscribe(
      (status) => (this.deleteForm = status)
    );

    this.inputSubscription = this.catServices.hideInputField.subscribe(
      (data) => {
        if (data) this.showInputField = false;
      }
    );
  }

  enableCategoryEdit(id: number) {
    this.editCategory = true;
    this.selectedCategory = id;
  }

  enableSubcategoryEdit(id: number) {
    this.editsubCategory = true;
    this.selectedSubcategory = id;
  }

  updateCategory(id: number) {
    this.categoryForm.value.name
      ? this.catServices.editCategory(id, this.categoryForm.value)
      : console.log('NULL');
    this.editCategory = false;
  }

  storeCategory(category) {
    console.log(category);
    localStorage.setItem('category', category);
  }

  deleteCategory(id: number) {
    localStorage.setItem('categoryId', JSON.stringify(id));
    this.deleteForm = true;
  }

  addNewSubcategory(category: string, id: number) {
    localStorage.setItem('category', category);
    this.selectedCategory = id;
    this.showInputField = true;
  }

  editSubcategory(subcategoryId: number, categoryName: string) {
    this.catServices.editSubCategory({
      id: subcategoryId,
      name: this.subcategoryForm.value.name,
      category: categoryName,
    });
    this.editsubCategory = false;
  }

  deleteSubcategory(id: number) {
    localStorage.setItem('subcategoryId', JSON.stringify(id));
    this.deleteForm = true;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.inputSubscription.unsubscribe();
  }
}
