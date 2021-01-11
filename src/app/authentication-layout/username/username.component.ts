import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthService,
  AuthResponseData,
} from 'src/app/shared/services/auth-service.service';
import { EmailResolverService } from 'src/app/shared/services/email-resolver.service';
import { ParticleService } from 'src/app/shared/services/particle.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css'],
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
export class UsernameComponent implements OnInit {
  usernameForm: FormGroup;
  userDetail;
  width: number = 100;
  height: number = 100;
  myStyle: Object = {};
  myParams: object = {};
  visible = true;
  message = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public particleService: ParticleService,
    private emailService: EmailResolverService
  ) {}

  ngOnInit(): void {
    this.myParams = this.particleService.getParticleParams();
    this.myStyle = this.particleService.getParticleStyle();

    this.usernameForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    // logic to check whether email is valid
    let authObs: Observable<any>;
    authObs = this.authService.emailVerification(this.usernameForm.value.email);

    authObs.subscribe(
      (resData) => {
        // success response {success: 200, message: "user exist"}
        this.emailService.emailEnterStatus.next(true);
        this.visible = false;
        // Navigate to next page by passing email as param
        setTimeout(() => {
          this.router.navigate(['password'], {
            relativeTo: this.route,
            queryParams: { username: this.usernameForm.value.email },
          });
        }, 320);
      },
      (errorMessage) => {
        // {error: 400, message: "email doesnt exist"}
        // Email doesnot exist
        this.usernameForm.setErrors({ invalidEmail: true });
        this.message = errorMessage.error.message;
      }
    );
  }
}
