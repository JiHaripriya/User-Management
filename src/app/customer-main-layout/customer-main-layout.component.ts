import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from '../shared/services/customer/home-page.service';
import { GeneralNotificationsService } from '../shared/services/general-notifications.service';

@Component({
  selector: 'app-customer-main-layout',
  templateUrl: './customer-main-layout.component.html',
  styleUrls: ['./customer-main-layout.component.css'],
})
export class CustomerMainLayoutComponent implements OnInit {
  disableScroll = false;
  constructor(
    private notifs: GeneralNotificationsService,
    private route: ActivatedRoute,
    private customerHomePage: HomePageService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.data['role'] === 'user') {
      this.customerHomePage.openCartModal.subscribe(
        status =>{
          status === true ? this.disableScroll = true : this.disableScroll = false
          console.log(this.disableScroll)
        } 
      )
    } else this.notifs.contactAdminNotification('Access Forbidden');
  }
}
