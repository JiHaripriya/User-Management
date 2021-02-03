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
  categoryForm: FormGroup;
  selectedCategory = -1;
  deleteForm = false;
  reloadSubscription: Subscription;
  dataSubscription: Subscription;
  subscription: Subscription;

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

    this.subscription = this.catServices.deleteForm.subscribe(
      (status) => (this.deleteForm = status)
    );
  }

  enableCategoryEdit(id: number) {
    this.editCategory = true;
    this.selectedCategory = id;
  }

  updateCategory(id: number) {
    this.categoryForm.value.name
      ? this.catServices.editCategory(id, this.categoryForm.value)
      : console.log('NULL');
    this.editCategory = false;
  }

  deleteCategory(id: number) {
    localStorage.setItem('categoryId', JSON.stringify(id));
    this.deleteForm = true;
  }

  editSubcategory(id: number) {}

  deleteSubcategory(id: number) {}

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
