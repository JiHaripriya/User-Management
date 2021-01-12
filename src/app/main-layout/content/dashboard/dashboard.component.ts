import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingUsers: number;

  constructor(private userDetailsApi: UserDetailsService) {}

  ngOnInit(): void {
    this.userDetailsApi.fetchUserList().subscribe((userDetails) => {
      this.totalUsers = userDetails.length;
      this.activeUsers = userDetails.filter(
        (user) => user.status == 'active'
      ).length;
      this.inactiveUsers = userDetails.filter(
        (user) => user.status == 'inactive'
      ).length;
      this.pendingUsers = userDetails.filter(
        (user) => user.status == 'pending'
      ).length;
    });
  }
}
