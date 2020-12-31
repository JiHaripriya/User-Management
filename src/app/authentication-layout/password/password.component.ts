import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
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
      password = this.passwordForm.value;
    // logic to check whether password matches the user --> pass email and password to api

    // navigate to dashboard if authenticated
  }
}
