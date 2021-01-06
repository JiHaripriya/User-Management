import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

import {
  AuthResponseData,
  AuthService,
} from 'src/app/shared/services/auth-service.service';
import { ParticleService } from 'src/app/shared/services/particle.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class PasswordComponent implements OnInit, OnDestroy {
  passwordForm: FormGroup;
  hasEnteredEmail: boolean;
  emailSubscription: Subscription;

  width: number = 90;
  height: number = 90;
  myStyle: Object = {};
  myParams: object = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public particleService: ParticleService,
    private userDetailsApi: UserDetailsService
  ) {}

  ngOnInit(): void {
    // Redirect if the user has not entered email
    this.emailSubscription = this.activatedRoute.data.subscribe((data) => {
      if (data['status'] === false) this.router.navigateByUrl('/login');
    });

    this.myParams = this.particleService.getParticleParams();
    this.myStyle = this.particleService.getParticleParams();

    this.passwordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
    });

    this.authService.user.subscribe((res) => console.log(res));
  }

  onSubmit() {
    const userEmail = this.activatedRoute.snapshot.queryParams['username'],
      password = this.passwordForm.value.password;

    let authObs: Observable<AuthResponseData>;

    // logic to check whether password matches the user --> pass email and password to api
    authObs = this.authService.login(userEmail, password);

    authObs.subscribe(
      (resData) => {
        // fetch user details from user-db.json FOR USER ROLE
        this.userDetailsApi.fetchUserDetails(userEmail).subscribe((res) => {
          localStorage.setItem(
            'userDetails',
            JSON.stringify(
              Object.assign(JSON.parse(JSON.stringify(res)), {
                token: resData.idToken,
              })
            )
          );
          // navigate to dashboard if authenticated
          this.router.navigateByUrl('/home/dashboard');
        });
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
  }
}
