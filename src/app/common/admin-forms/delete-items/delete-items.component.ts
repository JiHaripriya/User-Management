import { Component, OnInit } from '@angular/core';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';

@Component({
  selector: 'app-delete-items',
  templateUrl: './delete-items.component.html',
  styleUrls: ['./delete-items.component.css'],
})
export class DeleteItemsComponent implements OnInit {
  constructor(private catServices: CategoryServices) {}

  ngOnInit(): void {}

  cancelDelete() {
    this.catServices.deleteForm.next(false);
  }

  delete() {
    // delete category
    if (localStorage.getItem('categoryId')) {
      const selectedId = Number(localStorage.getItem('categoryId'));
      this.catServices.deleteCategory(selectedId);
      this.catServices.deleteForm.next(false);
      localStorage.removeItem('categoryId');
    }

    // delete subcategory
    if (localStorage.getItem('subcategoryId')) {
      const selectedId = Number(localStorage.getItem('subcategoryId'));
      this.catServices.deleteSubCategory(selectedId);
      this.catServices.deleteForm.next(false);
      localStorage.removeItem('subcategoryId');
    }
  }
}
