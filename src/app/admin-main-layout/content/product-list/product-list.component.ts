import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
  categoryMapping;
  subcategoryMapping;

  listView = false;
  pageNum = 1;
  pageSize = 9;
  page = '';
  showAllProducts = false;

  listSubscription: Subscription;
  gridSubscription: Subscription;
  loadCategorySubscription: Subscription;
  loadSubcategorySubscription: Subscription;

  @ViewChild('inputValue') searchValue: ElementRef;

  constructor(
    private formService: FormServiceService,
    private router: Router,
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
      this.showAllProducts = false;
    } else {
      this.showAllProducts = true;
      this.page = this.router.url.split('/').pop();
      // Load all products
      this.productServices.getAllProducts().subscribe((data) => {
        this.products = data;
        this.mappingFunction(this.products);
      });
    }
  }

  ngOnInit(): void {
    this.listSubscription = this.productServices.listViewSelected.subscribe(
      (status) => (status ? (this.listView = status) : (this.listView = false))
    );
    this.gridSubscription = this.productServices.collapselistView.subscribe(
      (status) => (status ? (this.listView = false) : (this.listView = true))
    );

    this.loadCategorySubscription = this.categoryServices.loadCategory.subscribe(
      (data) => {
        if (data.status) {
          this.showAllProducts = false;
          this.loadProductsByCategory(data.categoryName);
        }
      }
    );

    this.loadSubcategorySubscription = this.categoryServices.loadSubcategory.subscribe(
      (data) => {
        if (data.status) {
          this.showAllProducts = false;
          this.loadProductsBySubcategory(data.subcategoryName);
        }
      }
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

  paginationUpperLimit() {
    return this.pageNum * this.pageSize;
  }

  paginationLowerLimit() {
    return (this.pageNum - 1) * this.pageSize;
  }

  scrollToTop() {
    this.page === 'shop' ? window.scrollTo(0, 250) : window.scrollTo(0, 0);
  }

  addToCart(item: any) {
    this.cartServices.addCartItem(
      Object.assign({}, { productName: item.name, productQuantity: 1 })
    );
  }

  search(searchItem: string) {
    if (searchItem) {
      this.productServices.productSearch(searchItem).subscribe((data) => {
        this.products = data;
        this.mappingFunction(this.products);
      });
    }
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
    this.gridSubscription.unsubscribe();
    this.loadCategorySubscription.unsubscribe();
    this.loadSubcategorySubscription.unsubscribe();
  }
}
