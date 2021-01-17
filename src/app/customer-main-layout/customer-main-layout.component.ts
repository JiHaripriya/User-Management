import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.data['role'] === 'user') {
    } else this.notifs.contactAdminNotification('Access Forbidden');
  }
}
