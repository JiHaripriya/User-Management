import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/shared/services/home-page.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private homePageServices: HomePageService
  ) {}

  ngOnInit(): void {}

  setTitle(selectedOption: string) {
    this.homePageServices.passTitle.next(selectedOption);
    this.homePageServices.loadProfileStatus.next(false);
  }
}
