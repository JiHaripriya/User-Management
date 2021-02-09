import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';

@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.css'],
})
export class SubcategoryFormComponent implements OnInit {
  subcategoryForm: FormGroup;
  categoryNames;
  subcategoryNames;

  constructor(private catServices: CategoryServices) {
    this.catServices
      .getCategoryMapping()
      .subscribe((data) => (this.categoryNames = data));

    this.catServices
      .getSubcategoryMapping()
      .subscribe((data) => (this.subcategoryNames = data));
  }

  ngOnInit(): void {
    this.subcategoryForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-za-z ]+'),
      ]),
    });
  }

  addSubcategory() {
    this.subcategoryForm.value.name
      ? this.catServices.createSubCategory({
          name: this.subcategoryForm.value.name,
          category: localStorage.getItem('category'),
        })
      : console.log('NULL');
    this.subcategoryForm.reset();
    localStorage.removeItem('category');
    this.catServices.reloadComponent.next(true);
    this.catServices.hideInputField.next(true);
  }
}
