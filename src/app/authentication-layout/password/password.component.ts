import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/shared/services/api.service';
import { ParticleService } from 'src/app/shared/services/particle.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;

  width: number = 100;
  height: number = 100;
  myStyle: Object = {};
  myParams: object = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public particleService: ParticleService
  ) {}

  ngOnInit(): void {
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
        // fetch user details from user-db.json

        // navigate to dashboard if authenticated
        this.router.navigateByUrl('/home/dashboard');
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }
}
