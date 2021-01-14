import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { UserDetailsService } from 'src/app/shared/services/api/user-details.service';
import { FormServiceService } from 'src/app/shared/services/form-service.service';
import { GeneralNotificationsService } from 'src/app/shared/services/general-notifications.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit, OnDestroy {
  userDetails: UserDetails[];
  userDetailsSubscription: Subscription;
  reloadSubscription: Subscription;
  loading = false;
  role: string;

  constructor(
    private userDetailsApi: UserDetailsService,
    private route: ActivatedRoute,
    private formService: FormServiceService,
    private notifs: GeneralNotificationsService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.data['role'] === 'admin') {
      this.reloadSubscription = this.userDetailsApi.reloadComponent.subscribe(
        (status) => {
          if (status === true) {
            this.ngOnInit();
          }
          this.reloadSubscription.unsubscribe();
        }
      );

      this.role = this.route.snapshot.data['role'];

      this.loading = true;

      this.userDetailsSubscription = this.userDetailsApi
        .fetchUserList()
        .subscribe((data) => {
          this.userDetails = data
            .filter(
              (user) =>
                user.email !==
                JSON.parse(localStorage.getItem('userData')).email
            )
            .reverse();
          this.loading = false;
        });
    } else this.notifs.contactAdminNotification('Access Forbidden');
  }

  onAdd() {
    this.formService.openAddUserForm.next(true);
  }

  onEdit(index) {
    this.formService.openEditUserForm.next({
      data: this.userDetails.filter((user) => user.id == index)[0],
      selectedId: index,
    });
  }

  onDelete(index) {
    this.formService.deleteFormParameters.next({ index: index });
  }

  ngOnDestroy() {
    this.userDetailsSubscription.unsubscribe();
    this.reloadSubscription.unsubscribe();
  }
}
