import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { UsernameComponent } from './authentication-layout/username/username.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', children: [
      { path: '', component: UsernameComponent, pathMatch: 'full' },
      { path: 'password', component: PasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
