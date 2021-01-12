import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomePageService } from '../shared/services/home-page.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  loadProfile = false;
  subscription: Subscription;

  constructor(private homePageServices: HomePageService) { 
    this.subscription = this.homePageServices.loadProfileStatus.subscribe(status => this.loadProfile = status);
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
