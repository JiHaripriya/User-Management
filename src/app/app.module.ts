import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsernameComponent } from './authentication-layout/username/username.component';
import { PasswordComponent } from './authentication-layout/password/password.component';
import { NewPasswordComponent } from './authentication-layout/new-password/new-password.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './main-layout/header/header.component';
import { ContentComponent } from './main-layout/content/content.component';
import { SidebarComponent } from './main-layout/sidebar/sidebar.component';
import { FooterComponent } from './main-layout/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    UsernameComponent,
    PasswordComponent,
    NewPasswordComponent,
    MainLayoutComponent,
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
