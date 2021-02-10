import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GeneralNotificationsService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  contactAdminNotification(errorMessage: string) {
    this.router.navigate(['../../contactAdmin'], {
      relativeTo: this.route,
      queryParams: { errorMessage: errorMessage },
    });
  }
}
