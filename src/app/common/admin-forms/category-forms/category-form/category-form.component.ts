import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private catServices: CategoryServices) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-za-z ]+'),
      ]),
    });
  }

  addCategory() {
    this.categoryForm.value.name
      ? this.catServices.createCategory(this.categoryForm.value)
      : console.log('NULL');
    this.categoryForm.reset();
  }
}
