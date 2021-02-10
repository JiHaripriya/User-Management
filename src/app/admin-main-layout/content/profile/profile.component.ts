import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralNotificationsService } from 'src/app/shared/services/general-notifications.service';
import { UserDetailsService } from 'src/app/shared/services/api/user-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userDetailsSubscription: Subscription;
  reloadSubscription: Subscription;
  userDetails: any;
  loading = false;
  profileForm: FormGroup;

  constructor(
    private userDetailsApi: UserDetailsService,
    private route: ActivatedRoute,
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

      this.loading = true;

      this.userDetailsSubscription = this.userDetailsApi
        .fetchUserList()
        .subscribe((data) => {
          this.userDetails = data.filter(
            (user) =>
              user.email === JSON.parse(localStorage.getItem('userData')).email
          )[0];

          this.profileForm = new FormGroup({
            firstname: new FormControl(
              this.userDetails.firstname,
              Validators.required
            ),
            lastname: new FormControl(
              this.userDetails.lastname,
              Validators.required
            ),
            email: new FormControl(this.userDetails.email, [
              Validators.email,
              Validators.required,
            ]),
          });

          this.loading = false;
        });
    } else this.notifs.contactAdminNotification('Access Forbidden');
  }

  onSubmit() {
    const updatedData = Object.assign(
      JSON.parse(localStorage.getItem('userData')),
      this.profileForm.value
    );
    const { email, ...rest } = this.profileForm.value;
    localStorage.setItem('userData', JSON.stringify(updatedData));
    this.userDetailsApi.updateOwnDetails(rest);
  }
}
