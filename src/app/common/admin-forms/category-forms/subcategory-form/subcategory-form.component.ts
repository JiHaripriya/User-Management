import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';

@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.css']
})
export class SubcategoryFormComponent implements OnInit {

  subcategoryForm: FormGroup;
  categoryNames;

  constructor(private catServices: CategoryServices) { }

  ngOnInit(): void {
    this.subcategoryForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        // Validators.pattern('[A-za-z\'\-:! ]+'), --> product name pattern
        Validators.pattern('[A-za-z ]+'),
      ]),
    });
  }

  addSubcategory() {
    this.subcategoryForm.value.name
      ? this.catServices.createSubCategory(this.subcategoryForm.value)
      : console.log('NULL');
    this.subcategoryForm.reset();
    this.catServices.reloadComponent.next(true);
  }

}
