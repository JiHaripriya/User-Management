import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alerts } from '../shared/models/alert.model';
import { AdminHomePageService } from '../shared/services/admin/admin-home-page.service';
import { CategoryServices } from '../shared/services/api/category-services.service';

@Component({
  selector: 'app-admin-main-layout',
  templateUrl: './admin-main-layout.component.html',
  styleUrls: ['./admin-main-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminMainLayoutComponent implements OnInit, OnDestroy {
  loadProfile = false;
  subscription: Subscription;

  alerts: Alerts[] = [];

  constructor(
    private homePageServices: AdminHomePageService,
    private catServices: CategoryServices
  ) {
    this.subscription = this.homePageServices.loadProfileStatus.subscribe(
      (status) => (this.loadProfile = status)
    );
  }

  ngOnInit(): void {
    this.catServices.categoryAlerts.subscribe((alertData) => {
      this.alerts.push(alertData);
      setTimeout(
        () => this.alerts.splice(this.alerts.indexOf(alertData), 1),
        5000
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close(alert: Alerts) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
