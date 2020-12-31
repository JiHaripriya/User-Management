import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css'],
})
export class UsernameComponent implements OnInit {
  usernameForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute) {}

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
}
