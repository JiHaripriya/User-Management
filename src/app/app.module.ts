import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { NewPasswordComponent } from './authentication-layout/new-password/new-password.component';
import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './admin-main-layout/admin-main-layout.component';
import { HeaderComponent } from './admin-main-layout/header/header.component';
import { SidebarComponent } from './admin-main-layout/sidebar/sidebar.component';
import { FooterComponent } from './admin-main-layout/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ParticlesModule } from 'angular-particle';
import { AuthInterceptorService } from './shared/services/api/auth-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsFormComponent } from './common/details-form/details-form.component';
import { DeleteFormComponent } from './common/delete-form/delete-form.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { DashboardComponent } from './admin-main-layout/content/dashboard/dashboard.component';
import { ProfileComponent } from './admin-main-layout/content/profile/profile.component';
import { UsersComponent } from './admin-main-layout/content/users/users.component';

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
    LoaderComponent,
    DetailsFormComponent,
    DeleteFormComponent,
    ContactAdminComponent,
    ProfileComponent
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
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
