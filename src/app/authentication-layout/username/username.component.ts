import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from 'src/app/shared/api.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css'],
})
export class UsernameComponent implements OnInit {
  
  usernameForm: FormGroup;
  userDetail;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}


  ngOnInit(): void {
    this.usernameForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    // logic to check whether email is valid

    // Navigate to next page by passing email as param
    this.router.navigate(['password'], {
      relativeTo: this.route,
      queryParams: { username: this.usernameForm.value.email },
    });
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
