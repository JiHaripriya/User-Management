import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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
  role: string;
  constructor(private userDetailsApi: UserDetailsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.data['role'];  
      
    this.loading = true;
    this.userDetailsApi.fetchUserList();
    this.userDetailsSubscription = this.userDetailsApi.fetchUserList().subscribe(
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
