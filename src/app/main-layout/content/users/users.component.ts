import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

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
    private formService: FormServiceService
  ) {}

  ngOnInit(): void {
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
        this.userDetails = data.filter(
          (user) =>
            user.email !== JSON.parse(localStorage.getItem('userData')).email
        );
        this.loading = false;
      });
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
