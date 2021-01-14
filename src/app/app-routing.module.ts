import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPasswordComponent } from './authentication-layout/new-password/new-password.component';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { DashboardComponent } from './main-layout/content/dashboard/dashboard.component';
import { ProfileComponent } from './main-layout/content/profile/profile.component';
import { UsersComponent } from './main-layout/content/users/users.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminAuthGuardService } from './shared/services/guards/admin-auth-guard.service';
import { EmailResolverService } from './shared/services/resolvers/email-resolver.service';
import { LoginGuardService } from './shared/services/guards/login-guard.service';
import { RoleResolverService } from './shared/services/resolvers/role-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [LoginGuardService],
    children: [
      { path: '', component: UsernameComponent, pathMatch: 'full'},
      { path: 'password', component: PasswordComponent, resolve: {status: EmailResolverService} },
    ],
  },
  { path: 'setPassword', canActivate: [LoginGuardService], component: NewPasswordComponent },
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AdminAuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent, resolve: {role: RoleResolverService} },
      { path: 'users', component: UsersComponent, resolve: {role: RoleResolverService} },
      { path: 'profile', component: ProfileComponent, resolve: {role: RoleResolverService} }
    ],
  },
  { path: 'contactAdmin', component: ContactAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
