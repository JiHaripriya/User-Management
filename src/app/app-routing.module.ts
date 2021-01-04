import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPasswordComponent } from './authentication-layout/new-password/new-password.component';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { DashboardComponent } from './main-layout/content/dashboard/dashboard.component';
import { UsersComponent } from './main-layout/content/users/users.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { EmailResolverService } from './shared/services/email-resolver.service';
import { LoginGuardService } from './shared/services/login-guard.service';

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
  { path: 'setPassword', component: NewPasswordComponent },
  {
    path: 'home',
    component: MainLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
