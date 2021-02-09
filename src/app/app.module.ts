import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { NewPasswordComponent } from './authentication-layout/new-password/new-password.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminMainLayoutComponent } from './admin-main-layout/admin-main-layout.component';
import { HeaderComponent } from './admin-main-layout/header/header.component';
import { SidebarComponent } from './admin-main-layout/sidebar/sidebar.component';
import { FooterComponent } from './admin-main-layout/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ParticlesModule } from 'angular-particle';
import { AuthInterceptorService } from './shared/services/api/auth-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsFormComponent } from './common/admin-forms/user-forms/details-form/details-form.component';
import { DeleteFormComponent } from './common/admin-forms/user-forms/delete-form/delete-form.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { DashboardComponent } from './admin-main-layout/content/dashboard/dashboard.component';
import { ProfileComponent } from './admin-main-layout/content/profile/profile.component';
import { UsersComponent } from './admin-main-layout/content/users/users.component';
import { CustomerMainLayoutComponent } from './customer-main-layout/customer-main-layout.component';
import { CategoriesComponent } from './admin-main-layout/content/categories/categories.component';
import { ProductListComponent } from './admin-main-layout/content/product-list/product-list.component';
import { CustomerHeaderComponent } from './customer-main-layout/customer-home-header/customer-home-header.component';
import { BannerComponent } from './customer-main-layout/banner/banner.component';
import { ContactComponent } from './customer-main-layout/contact/contact.component';
import { CustomerHomeComponent } from './customer-main-layout/customer-home/customer-home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductAddEditFormComponent } from './common/admin-forms/product-forms/product-add-edit-form/product-add-edit-form.component';
import { ProductDetailsFormComponent } from './common/admin-forms/product-forms/product-details-form/product-details-form.component';
import { CartComponent } from './customer-main-layout/cart/cart.component';
import { ShopComponent } from './customer-main-layout/shop/shop.component';
import { ProductCategoryComponent } from './customer-main-layout/product-category/product-category.component';
import { FilterComponent } from './customer-main-layout/filter/filter.component';
import { SortComponent } from './customer-main-layout/sort/sort.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NoResultsComponent } from './common/no-results/no-results.component';
import { CategoryFormComponent } from './common/admin-forms/category-forms/category-form/category-form.component';
import { SubcategoryFormComponent } from './common/admin-forms/category-forms/subcategory-form/subcategory-form.component';
import { DeleteItemsComponent } from './common/admin-forms/delete-items/delete-items.component';
import { ProductDetailsComponent } from './admin-main-layout/content/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UsernameComponent,
    PasswordComponent,
    NewPasswordComponent,
    NewPasswordComponent,
    AdminMainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    UsersComponent,
    LoaderComponent,
    DetailsFormComponent,
    DeleteFormComponent,
    ContactAdminComponent,
    ProfileComponent,
    CustomerMainLayoutComponent,
    CategoriesComponent,
    ProductListComponent,
    CustomerHeaderComponent,
    BannerComponent,
    ContactComponent,
    CustomerHomeComponent,
    ProductAddEditFormComponent,
    ProductDetailsFormComponent,
    CartComponent,
    ShopComponent,
    ProductCategoryComponent,
    FilterComponent,
    SortComponent,
    NoResultsComponent,
    CategoryFormComponent,
    SubcategoryFormComponent,
    DeleteItemsComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ParticlesModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxSliderModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
