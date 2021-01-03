import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  userDetails: UserDetails[];
  userDetailsSubscription: Subscription;
  loading = false;
  constructor(private userDetailsApi: UserDetailsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userDetailsApi.fetchUserDetails();
    this.userDetailsSubscription = this.userDetailsApi.fetchUserDetails().subscribe(
      data => {
        this.userDetails = data;
        this.loading = false;
      }
    )
  }

  ngOnDestroy() {
    // this.userDetailsSubscription.unsubscribe();
  }
}
