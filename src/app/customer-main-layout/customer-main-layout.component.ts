import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryServices } from '../shared/services/api/category-services.service';
import { GeneralNotificationsService } from '../shared/services/general-notifications.service';

@Component({
  selector: 'app-customer-main-layout',
  templateUrl: './customer-main-layout.component.html',
  styleUrls: ['./customer-main-layout.component.css'],
})
export class CustomerMainLayoutComponent implements OnInit {
  disableScroll = false;
  categoryMapping;
  subcategoryMapping;

  constructor(
    private notifs: GeneralNotificationsService,
    private route: ActivatedRoute,
    private categoryServices: CategoryServices
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.data['role'] === 'user') {
      this.mappingFunction();
    } else this.notifs.contactAdminNotification('Access Forbidden');
  }

  private async mappingFunction() {
    localStorage.setItem('categoryMapping', JSON.stringify(await this.categoryServices
      .getCategoryMapping()
      .toPromise())) 
    localStorage.setItem('subcategoryMapping', JSON.stringify(await this.categoryServices
      .getSubcategoryMapping()
      .toPromise()))
  }
}
