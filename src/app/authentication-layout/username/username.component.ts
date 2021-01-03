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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usernameForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {

    // logic to check whether email is valid
    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.emailVerification(this.usernameForm.value.email);

    authObs.subscribe(
      (resData) => {
        console.log(resData);
      },
      (errorMessage) => {
        if (errorMessage == 'This password is not correct.') {
          // Navigate to next page by passing email as param
          this.router.navigate(['password'], {
            relativeTo: this.route,
            queryParams: { username: this.usernameForm.value.email },
          });
        }
      }
    );
  }
}
