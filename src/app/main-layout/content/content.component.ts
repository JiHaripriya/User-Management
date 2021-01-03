import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/shared/user-details.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  userDetails: UserDetails[];
  constructor(private userDetailsApi: UserDetailsService) { }

  ngOnInit(): void {
    this.userDetailsApi.fetchUserDetails();
    this.userDetailsApi.fetchUserDetails().subscribe(
      data => this.userDetails = data
    )
  }

}
