import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

import { AuthService } from 'src/app/shared/services/api/auth-service.service';
import { ParticleService } from 'src/app/shared/services/particle.service';
import { GeneralNotificationsService } from 'src/app/shared/services/general-notifications.service';

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
  message = '';

  width: number = 90;
  height: number = 90;
  myStyle: Object = {};
  myParams: object = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public particleService: ParticleService,
    private notifs: GeneralNotificationsService
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
  }

  onSubmit() {
    const userEmail = this.activatedRoute.snapshot.queryParams['username'],
      password = this.passwordForm.value.password;

    let authObs: Observable<any>;

    // logic to check whether password matches the user --> pass email and password to api
    authObs = this.authService.login(userEmail, password);

    authObs.subscribe(
      (resData) => {
        // if the user is active or pending redirect
        if (resData.status === 'pending') {
          this.notifs.contactAdminNotification('Verify your email first!');
        } else if (resData.status === 'inactive') {
          this.notifs.contactAdminNotification(
            'You have been inactive for a while. Contact Admin immediately.'
          );
        } else {
          // navigate to dashboard if authenticated
          resData.data.role === 'admin' ? this.router.navigateByUrl('/admin/dashboard'): this.router.navigateByUrl('/user/home');
        }
      }, // wrong password
      (errorMessage) => {
        console.log(errorMessage);        
        this.passwordForm.setErrors({ invalidPassword: true });
        this.message = errorMessage.error.message;
      }
    );
  }

  // Forgot password
  notifyUser() {
    this.notifs.contactAdminNotification('An email will be sent to you soon!');
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
  }
}
