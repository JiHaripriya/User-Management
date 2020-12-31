import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    /*
      Validations provided:
      1. At least one uppercase letter, one lowercase letter, one number and one special character
      2. New password and confirm password should match
    */
    this.setPasswordForm = new FormGroup({
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
    });
  }

  private checkPasswords() {
    const password = this.setPasswordForm.get('newPassword').value;
    const confirmPassword = this.setPasswordForm.get('confirmPassword').value;
    return password == confirmPassword
      ? true
      : this.setPasswordForm.setErrors({ mismatch: true });
  }

  private passwordPatternCheck() {
    const password = this.setPasswordForm.get('newPassword').value;
    const confirmPassword = this.setPasswordForm.get('confirmPassword').value;

    const newPasswordCheck =
      this.hasUppercaseLetter(password) &&
      this.hasLowercaseLetter(password) &&
      this.hasDigits(password) &&
      this.hasSpecialCharacters(password)
        ? true
        : false;
    const confirmPasswordCheck =
      this.hasUppercaseLetter(confirmPassword) &&
      this.hasLowercaseLetter(confirmPassword) &&
      this.hasDigits(confirmPassword) &&
      this.hasSpecialCharacters(confirmPassword)
        ? true
        : false;

    return newPasswordCheck && confirmPasswordCheck
      ? true
      : this.setPasswordForm.setErrors({ patternError: true });
  }

  private hasUppercaseLetter(password: string) {
    return password.match(new RegExp('[A-Z]+', 'g'));
  }

  private hasLowercaseLetter(password: string) {
    return password.match(new RegExp('[a-z]+', 'g'));
  }

  private hasDigits(password: string) {
    return password.match(new RegExp('[0-9]+', 'g'));
  }

  private hasSpecialCharacters(password: string) {
    return password.match(new RegExp('[!@#$%^&*]+', 'g'));
  }

  onSubmit() {
    if(this.checkPasswords()) {
      if(this.passwordPatternCheck()) {
        console.log(this.setPasswordForm.value);
      }
    }
  }
}
