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
  firstname: string;
  constructor(
    private authService: AuthService,
    private homeServices: HomePageService,
    private homePageServices: HomePageService
  ) {}

  ngOnInit(): void {
    this.homeServices.passTitle.subscribe((title) => (this.title = title));
    this.firstname = JSON.parse(localStorage.getItem('userData')).firstname;
  }

  onLogout() {
    this.authService.logout();
  }

  setTitle(selectedOption: string) {
    this.homePageServices.loadProfileStatus.next(true);
    this.homePageServices.passTitle.next(selectedOption);
  }
}
