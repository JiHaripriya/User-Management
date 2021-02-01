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
  minPrice = 0;
  maxPrice = 100000;

  listSubscription: Subscription;
  gridSubscription: Subscription;
  productsSubscription: Subscription;
  loadCategorySubscription: Subscription;
  loadSubcategorySubscription: Subscription;
  priceFilterSubscription: Subscription;

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
      this.productsSubscription = this.productServices
        .getAllProducts()
        .subscribe((data) => {
          this.products = this.filterByPrice(data);
          this.mappingFunction(this.products);
          console.log(this.products);
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

    this.priceFilterSubscription = this.productServices.priceFilter.subscribe(
      (limits) => {
        (this.minPrice = limits.minPrice), (this.maxPrice = limits.maxPrice);
        this.productsSubscription = this.productServices
          .getAllProducts()
          .subscribe((data) => {
            this.products = this.filterByPrice(data);
            this.mappingFunction(this.products);
            // Category already selected
            if (this.router.url.includes('category=')) {
              // Subcategory already selected
              if (this.router.url.includes('subcategory=')) {
                const names = this.getCategorySubcategory();
                this.products = this.products.filter(
                  (product) =>
                    product.category_name === names.category &&
                    product.subcategory_name === names.subcategory
                );
              } else {
                const category = this.getCategory();
                this.products = this.products.filter(
                  (product) => product.category_name === category
                );
              }
            }
          });
      }
    );
  }

  private getCategorySubcategory() {
    const url = this.router.url;
    return {
      category: url
        .slice(url.indexOf('?category='), url.indexOf('&subcategory'))
        .split('=')
        .pop(),
      subcategory: url
        .slice(url.indexOf('&subcategory'))
        .split('&subcategory=')
        .pop(),
    };
  }

  private getCategory() {
    const url = this.router.url;
    return {
      category: url.split('?').pop().split('category=').pop(),
    };
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
    this.productsSubscription = this.categoryServices
      .productsUnderSubcategory(this.router.url.split('=').pop())
      .subscribe((data) => {
        this.products = this.filterByPrice(data);
        this.mappingFunction(this.products);
      });
  }

  private loadProductsByCategory(category) {
    this.productsSubscription = this.categoryServices
      .productsUnderCategory(category)
      .subscribe((data) => {
        this.products = this.filterByPrice(data);
        this.mappingFunction(this.products);
      });
  }

  private loadProductsBySubcategory(subcategory) {
    this.productsSubscription = this.categoryServices
      .productsUnderSubcategory(subcategory)
      .subscribe((data) => {
        this.products = this.filterByPrice(data);
        this.mappingFunction(this.products);
      });
  }

  private filterByPrice(data) {
    return data.filter(
      (product) =>
        this.minPrice <= product.price && product.price <= this.maxPrice
    );
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
          this.mappingFunction(this.products);
        });
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
