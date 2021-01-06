import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { NewPasswordComponent } from './authentication-layout/new-password/new-password.component';
import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './main-layout/header/header.component';
import { SidebarComponent } from './main-layout/sidebar/sidebar.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { DashboardComponent } from './main-layout/content/dashboard/dashboard.component';
import { UsersComponent } from './main-layout/content/users/users.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ParticlesModule } from 'angular-particle';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    UsernameComponent,
    PasswordComponent,
    NewPasswordComponent,
    NewPasswordComponent,
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    UsersComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ParticlesModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
