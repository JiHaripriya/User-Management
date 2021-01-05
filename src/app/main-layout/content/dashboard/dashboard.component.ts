import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userDetailsApi: UserDetailsService) { }

  ngOnInit(): void {
  }

}
