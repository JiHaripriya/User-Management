import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/api.service';
import { HomePageService } from 'src/app/shared/services/home-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = 'Dashboard';
  constructor(private authService: AuthService, private homeServices: HomePageService) { }

  ngOnInit(): void {
    this.homeServices.passTitle.subscribe(
      title => this.title = title
    )
  }

  onLogout() {
    this.authService.logout();
  }

}
