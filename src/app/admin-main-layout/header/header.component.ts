import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth-service.service';
import { AdminHomePageService } from 'src/app/shared/services/admin/admin-home-page.service';

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
    private homePageServices: AdminHomePageService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url.indexOf('?product') === -1)
          this.title = event.url.split('/').pop();
        if (this.title === 'profile' || this.title === 'dashboard')
          this.homePageServices.loadProfileStatus.next(true);
        else this.homePageServices.loadProfileStatus.next(false);
      }
    });
  }

  ngOnInit(): void {
    this.firstname = JSON.parse(localStorage.getItem('userData')).firstname;
  }

  onLogout() {
    this.authService.logout();
  }
}
