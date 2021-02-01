import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from 'src/app/shared/services/admin/form-service.service';
import { CategoryServices } from 'src/app/shared/services/api/category-services.service';
import { ProductServicesService } from 'src/app/shared/services/api/product-services.service';
import { CartService } from 'src/app/shared/services/customer/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit, OnDestroy {
  searchItem;
  products;
  listView = false;
  listSubscription: Subscription;
  gridSubscription: Subscription;
  categoryMapping;
  subcategoryMapping;
  pageNum = 1;
  pageSize = 9;

  constructor(
    private formService: FormServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private productServices: ProductServicesService,
    private categoryServices: CategoryServices,
    private cartServices: CartService
  ) {
    if (this.router.url.indexOf('?') !== -1) {
      this.page = this.router.url
        .slice(0, this.router.url.indexOf('?'))
        .split('/')
        .pop();
      this.loadProductsFromParameters();
      // logic to load products by category or subcategory
    } else {
      this.page = this.router.url.split('/').pop();
      // Load all products
      this.productServices.getAllProducts().subscribe((data) => {
        this.products = data;
        this.mappingFunction(this.products);
      });
    }
  }

  private mappingFunction(products) {
    this.categoryMapping = JSON.parse(localStorage.getItem('categoryMapping'));
    this.subcategoryMapping = JSON.parse(
      localStorage.getItem('subcategoryMapping')
    );
    products = products.map((product) => {
      Object.assign(product, {
        category_name: this.categoryMapping.filter(
          (data) => data.category_id === product.category_id
        )[0]?.name,
        subcategory_name: this.subcategoryMapping.filter(
          (data) => data.id === product.subcategory_id
        )[0]?.name,
      });
    });
  }

  private loadProductsFromParameters() {
    this.categoryServices
      .productsUnderSubcategory(this.router.url.split('=').pop())
      .subscribe((data) => {
        this.products = data;
        this.mappingFunction(this.products);
      });
  }

  private loadProductsByCategory(category) {
    this.categoryServices.productsUnderCategory(category).subscribe((data) => {
      this.products = data;
      this.mappingFunction(this.products);
    });
  }

  private loadProductsBySubcategory(subcategory) {
    this.categoryServices
      .productsUnderSubcategory(subcategory)
      .subscribe((data) => {
        this.products = data;
        this.mappingFunction(this.products);
      });
  }

  page = '';

  ngOnInit(): void {
    this.listSubscription = this.productServices.listViewSelected.subscribe(
      (status) => (status ? (this.listView = status) : (this.listView = false))
    );
    this.gridSubscription = this.productServices.collapselistView.subscribe(
      (status) => (status ? (this.listView = false) : (this.listView = true))
    );

    this.categoryServices.loadCategory.subscribe((data) => {
      if (data.status) {
        this.loadProductsByCategory(data.categoryName);
      }
    });

    this.categoryServices.loadSubcategory.subscribe((data) => {
      if (data.status) {
        this.loadProductsBySubcategory(data.subcategoryName);
      }
    });
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

  paginationUpperLimit() {
    return this.pageNum * this.pageSize;
  }

  paginationLowerLimit() {
    return (this.pageNum - 1) * this.pageSize;
  }

  scrollToTop() {
    console.log(this.pageNum);
    this.page === 'shop' ? window.scrollTo(0, 250) : window.scrollTo(0, 0);
  }

  addToCart(item: any) {
    this.cartServices.addCartItem(
      Object.assign({}, { productName: item.name, productQuantity: 1 })
    );
  }
}
