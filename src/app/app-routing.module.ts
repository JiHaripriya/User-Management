import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './main-layout/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', children: [
      { path: '', component: UsernameComponent, pathMatch: 'full' },
      { path: 'password', component: PasswordComponent }
    ]
  },
  { path: 'dashboard', component: MainLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
