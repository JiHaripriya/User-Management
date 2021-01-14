import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminHomePageService } from '../shared/services/admin/admin-home-page.service';

@Component({
  selector: 'app-admin-main-layout',
  templateUrl: './admin-main-layout.component.html',
  styleUrls: ['./admin-main-layout.component.css']
})
export class AdminMainLayoutComponent implements OnInit, OnDestroy {

  loadProfile = false;
  subscription: Subscription;

  constructor(private homePageServices: AdminHomePageService) { 
    this.subscription = this.homePageServices.loadProfileStatus.subscribe(status => this.loadProfile = status);
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
