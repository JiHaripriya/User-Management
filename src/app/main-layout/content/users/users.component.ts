import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/shared/user-details.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userDetails: UserDetails[];
  constructor(private userDetailsApi: UserDetailsService) { }

  ngOnInit(): void {
    this.userDetailsApi.fetchUserDetails();
    this.userDetailsApi.fetchUserDetails().subscribe(
      data => this.userDetails = data
    )
  }

}
