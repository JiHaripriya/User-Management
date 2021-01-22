import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from 'src/app/shared/services/admin/form-service.service';
import { ProductServicesService } from 'src/app/shared/services/api/product-services.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  searchItem;
  products;
  listView = false;
  listSubscription: Subscription;
  gridSubscription: Subscription;

  constructor(
    private formService: FormServiceService,
    private router: Router,
    private productServices: ProductServicesService
  ) {
    this.productServices
      .getAllProducts()
      .subscribe((data) => (this.products = data));
  }

  page = '';

  ngOnInit(): void {
    this.page = this.router.url.split('/').pop();
    this.listSubscription = this.productServices.listViewSelected.subscribe((status) =>
      status ? (this.listView = status) : (this.listView = false)
    );
    this.gridSubscription = this.productServices.collapselistView.subscribe((status) =>
      status ? (this.listView = false) : (this.listView = true)
    );
  }

  onAdd() {
    this.formService.openProjectAddForm.next(true);
  }

  onEdit() {
    this.formService.openProjectEditForm.next(true);
  }

  onView() {
    this.formService.openProjectDetails.next(true);
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
    this.gridSubscription.unsubscribe();
  }
}
