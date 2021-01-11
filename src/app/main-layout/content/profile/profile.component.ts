import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userDetailsSubscription: Subscription;
  reloadSubscription: Subscription;
  userDetails: UserDetails[];
  loading = false;

  constructor(private userDetailsApi: UserDetailsService) {}

  ngOnInit(): void {
    this.reloadSubscription = this.userDetailsApi.reloadComponent.subscribe(
      (status) => {
        console.log('reload initiated');
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
        console.log('profile: ', data)
        this.userDetails = data.filter(
          (user) =>
            user.email === JSON.parse(localStorage.getItem('userData')).email
        )[0];
        console.log(this.userDetails);
        this.loading = false;
      });
  }

  ngOnDestroy(){
    this.userDetailsSubscription.unsubscribe();
  }
}
