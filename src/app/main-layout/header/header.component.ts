import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { HomePageService } from 'src/app/shared/services/home-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Dashboard';
  firstName: string;
  constructor(
    private authService: AuthService,
    private homeServices: HomePageService
  ) {}

  ngOnInit(): void {
    this.homeServices.passTitle.subscribe((title) => (this.title = title));
    this.firstName = JSON.parse(localStorage.getItem('userDetails')).first_name;
  }

  onLogout() {
    this.authService.logout();
  }
}
