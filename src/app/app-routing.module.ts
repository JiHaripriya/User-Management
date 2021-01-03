import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPasswordComponent } from './authentication-layout/new-password/new-password.component';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    children: [
      { path: '', component: UsernameComponent, pathMatch: 'full' },
      { path: 'password', component: PasswordComponent },
    ],
  },
  { path: 'setPassword', component: NewPasswordComponent },
  { path: 'dashboard', component: MainLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
