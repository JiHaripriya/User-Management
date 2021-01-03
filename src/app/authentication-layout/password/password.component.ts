import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthResponseData,
  AuthService,
} from 'src/app/shared/services/api.service';
import { ParticleService } from 'src/app/shared/services/particle.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

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
    public particleService: ParticleService,
    private userDetailsApi: UserDetailsService
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
        // fetch user details from user-db.json FOR USER ROLE
        /*
          Request url sample
          https://user-management-9229a-default-rtdb.firebaseio.com/users-db.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4MGU0NWJlNGIzMTE4MzA5M2RhNzUyYmIyZGU5Y2RjYTNlNmU4ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXVkIjoidXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXV0aF90aW1lIjoxNjA5NjkyMDY4LCJ1c2VyX2lkIjoiRTIzVnl2NFl6bVppOG1RcWFqTHNPdlIzdUxoMiIsInN1YiI6IkUyM1Z5djRZem1aaThtUXFhakxzT3ZSM3VMaDIiLCJpYXQiOjE2MDk2OTIwNjgsImV4cCI6MTYwOTY5NTY2OCwiZW1haWwiOiJoYXJpcHJpeWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhhcmlwcml5YUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.dL5NanO2rsb2-KSRsqahO3WwlyT0UENXFEipkw_mmsEN1e1xoTilU4_5fhGfyXJF8hdEGE8GywC_nD1NfagCt7-yMTPOk3LfR6TjPes54Z9Rz3DgWu_inFso3OCUe5l5pmeQODXAS1J5WSNXRNAIdwyh5UwO8Vy8iPFcIPh26ML_Igr6RSk7B-Gv_fcxBcGiS6W15yQqOqaRd-K3HNso0-PCTR-xgMGn0cla4FP37TflNC73SrUwsPwh_KGU9akOzRFaVJ89PBczNTJpQO3fa15EzNAEqzAniwdBVOhlFNFTeLaZNGtBe9187nD31BQWfvaIpXCtExp831F164raSw&orderBy="email"&equalTo="haripriya@gmail.com"
        */
        this.userDetailsApi
          .fetchUserDetails('', 'haripriya@gmail.com')
          .subscribe((res) => {
            console.log(res);
            localStorage.setItem(
              'userDetails',
              JSON.stringify(
                Object.assign(JSON.parse(JSON.stringify(res)), {
                  token:
                    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4MGU0NWJlNGIzMTE4MzA5M2RhNzUyYmIyZGU5Y2RjYTNlNmU4ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXVkIjoidXNlci1tYW5hZ2VtZW50LTkyMjlhIiwiYXV0aF90aW1lIjoxNjA5NjkyMDY4LCJ1c2VyX2lkIjoiRTIzVnl2NFl6bVppOG1RcWFqTHNPdlIzdUxoMiIsInN1YiI6IkUyM1Z5djRZem1aaThtUXFhakxzT3ZSM3VMaDIiLCJpYXQiOjE2MDk2OTIwNjgsImV4cCI6MTYwOTY5NTY2OCwiZW1haWwiOiJoYXJpcHJpeWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhhcmlwcml5YUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.dL5NanO2rsb2-KSRsqahO3WwlyT0UENXFEipkw_mmsEN1e1xoTilU4_5fhGfyXJF8hdEGE8GywC_nD1NfagCt7-yMTPOk3LfR6TjPes54Z9Rz3DgWu_inFso3OCUe5l5pmeQODXAS1J5WSNXRNAIdwyh5UwO8Vy8iPFcIPh26ML_Igr6RSk7B-Gv_fcxBcGiS6W15yQqOqaRd-K3HNso0-PCTR-xgMGn0cla4FP37TflNC73SrUwsPwh_KGU9akOzRFaVJ89PBczNTJpQO3fa15EzNAEqzAniwdBVOhlFNFTeLaZNGtBe9187nD31BQWfvaIpXCtExp831F164raSw',
                })
              )
            );
            this.authService.isAuthenticated();
          });

        // navigate to dashboard if authenticated
        this.router.navigateByUrl('/home/dashboard');
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }
}
