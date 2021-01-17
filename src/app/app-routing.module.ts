import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPasswordComponent } from './authentication-layout/new-password/new-password.component';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { AdminMainLayoutComponent } from './admin-main-layout/admin-main-layout.component';
import { AdminAuthGuardService } from './shared/services/guards/admin-auth-guard.service';
import { EmailResolverService } from './shared/services/resolvers/email-resolver.service';
import { LoginGuardService } from './shared/services/guards/login-guard.service';
import { RoleResolverService } from './shared/services/resolvers/role-resolver.service';
import { DashboardComponent } from './admin-main-layout/content/dashboard/dashboard.component';
import { ProfileComponent } from './admin-main-layout/content/profile/profile.component';
import { UsersComponent } from './admin-main-layout/content/users/users.component';
import { CustomerMainLayoutComponent } from './customer-main-layout/customer-main-layout.component';
import { CustomerAuthGuardService } from './shared/services/guards/customer-auth-guard.service';
import { CategoriesComponent } from './admin-main-layout/content/categories/categories.component';
import { ProductListComponent } from './admin-main-layout/content/product-list/product-list.component';
import { ContactComponent } from './customer-main-layout/contact/contact.component';
import { CustomerHomeComponent } from './customer-main-layout/customer-home/customer-home.component';
import { ShopComponent } from './customer-main-layout/shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [LoginGuardService],
    children: [
      { path: '', component: UsernameComponent, pathMatch: 'full' },
      {
        path: 'password',
        component: PasswordComponent,
        resolve: { status: EmailResolverService },
      },
    ],
  },
  {
    path: 'setPassword',
    canActivate: [LoginGuardService],
    component: NewPasswordComponent,
  },
  {
    path: 'admin',
    component: AdminMainLayoutComponent,
    canActivate: [AdminAuthGuardService],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: { role: RoleResolverService },
      },
      {
        path: 'users',
        component: UsersComponent,
        resolve: { role: RoleResolverService },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: { role: RoleResolverService },
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        resolve: { role: RoleResolverService },
      },
      {
        path: 'products',
        component: ProductListComponent,
        resolve: { role: RoleResolverService },
      },
    ],
  },
  {
    path: 'user',
    component: CustomerMainLayoutComponent,
    canActivate: [CustomerAuthGuardService],
    resolve: { role: RoleResolverService },
    children: [
      {
        path: 'home',
        component: CustomerHomeComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
    ],
  },
  { path: 'contactAdmin', component: ContactAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
