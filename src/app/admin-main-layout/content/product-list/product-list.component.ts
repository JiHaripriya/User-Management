import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
  minPrice = 0;
  maxPrice = 100000;

  listSubscription: Subscription;
  gridSubscription: Subscription;
  productsSubscription: Subscription;
  loadCategorySubscription: Subscription;
  loadSubcategorySubscription: Subscription;
  priceFilterSubscription: Subscription;
  sortedProductsSubscription: Subscription;

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
      this.showAllProducts = false;
    } else {
      this.showAllProducts = true;
      this.page = this.router.url.split('/').pop();
    }
    this.initializeProducts();
    this.categoryServices.mappingFunction();
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

    this.priceFilterSubscription = this.productServices.priceFilter.subscribe(
      (limits) => {
        this.minPrice = limits.minPrice;
        this.maxPrice = limits.maxPrice >= 49999 ? 100000 : limits.maxPrice;
        this.initializeProducts();
      }
    );

    this.sortedProductsSubscription = this.productServices.sortedProducts.subscribe(
      (data) => {
        this.products = this.filterByPrice(data);
      }
    );

    this.productServices.loadAllProducts.subscribe((status) => {
      if (status){
        this.showAllProducts = true;
        this.initializeProducts();
      }
    });
  }

  private initializeProducts() {
    this.productsSubscription = this.productServices
      .getAllProducts()
      .subscribe((data) => {
        this.products = this.filterByPrice(data);
        this.products = this.categoryServices.addCategoryNames(this.products);
        this.filterProducts();
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

  private loadProductsByCategory(category) {
    this.productsSubscription = this.categoryServices
      .productsUnderCategory(category)
      .subscribe((data) => {
        this.products = this.filterByPrice(data);
        this.products = this.categoryServices.addCategoryNames(this.products);
      });
  }

  private loadProductsBySubcategory(subcategory) {
    this.productsSubscription = this.categoryServices
      .productsUnderSubcategory(subcategory)
      .subscribe((data) => {
        this.products = this.filterByPrice(data);
        this.products = this.categoryServices.addCategoryNames(this.products);
      });
  }

  private filterByPrice(data) {
    const products = data.filter(
      (product) =>
        this.minPrice <= product.price && product.price <= this.maxPrice
    );
    this.productServices.totalResults.next(products.length);
    return products;
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
      this.productsSubscription = this.productServices
        .productSearch(searchItem)
        .subscribe((data) => {
          this.products = data;
          this.products = this.categoryServices.addCategoryNames(this.products);
          this.filterProducts();
        });
    } else {
      this.initializeProducts();
    }
  }

  filterProducts() {
    if (this.router.url.includes('category=')) {
      // Category already selected
      if (this.router.url.includes('subcategory=')) {
        // Subcategory already selected
        const names = this.categoryServices.getCategorySubcategory(
          this.router.url
        );
        this.products = this.products.filter(
          (product) =>
            product.category_name === names.category &&
            product.subcategory_name === names.subcategory
        );
      } else {
        const category = this.categoryServices.getCategory(this.router.url);
        this.products = this.products.filter(
          (product) => product.category_name === category
        );
      }
    }
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
    this.gridSubscription.unsubscribe();
    this.loadCategorySubscription.unsubscribe();
    this.loadSubcategorySubscription.unsubscribe();
    this.priceFilterSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
  }
}
