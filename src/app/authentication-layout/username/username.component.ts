import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from 'src/app/shared/api.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {

  userDetail;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp() {
    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.signup('sid@gmail.com', 'password');

    authObs.subscribe(
      resData => {
        console.log(resData);
      },
      errorMessage => {
        console.log(errorMessage);
      }
    );
  }

}
