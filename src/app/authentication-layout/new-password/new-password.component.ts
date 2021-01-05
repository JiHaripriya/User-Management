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
  customErrors = {
    mismatch: 'Passwords donot match',
    noUppercase: 'Please add atleast one uppercase letter',
    noLowercase: 'Please add atleast one lowercase letter',
    noDigits: 'Please add atleast one number',
    noSpecialCharacter: 'Please add atleast one special character',
    patternError:
      'Minimum 8 characters with one uppercase letter, one lowercase letter, one number, and one special character required',
  };

  customErrorList = Object.keys(this.customErrors);
  someError = false;

  constructor(private router: Router) {}

  /*
    Validations provided:
    1. At least one uppercase letter, one lowercase letter, one number and one special character
    2. New password and confirm password should match
  */
  ngOnInit(): void {
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

    const newPasswordCheck = [
      this.hasUppercaseLetter(password),
      this.hasLowercaseLetter(password),
      this.hasDigits(password),
      this.hasSpecialCharacters(password),
    ].filter((value) => value !== true).length;

    const confirmPasswordCheck = [
      this.hasUppercaseLetter(confirmPassword),
      this.hasLowercaseLetter(confirmPassword),
      this.hasDigits(confirmPassword),
      this.hasSpecialCharacters(confirmPassword),
    ].filter((value) => value !== true).length;

    if (newPasswordCheck > 1 && confirmPasswordCheck > 1) {
      this.setPasswordForm.setErrors({ patternError: true });
      return false;
    } else if (newPasswordCheck === 1 && confirmPasswordCheck === 1) {
      this.someError = true;
      return false;
    } else {
      this.someError = false;
      return true;
    }
  }

  private hasUppercaseLetter(password: string) {
    return password.match(new RegExp('[A-Z]+', 'g'))
      ? true
      : this.setPasswordForm.setErrors({ noUppercase: true });
  }

  private hasLowercaseLetter(password: string) {
    return password.match(new RegExp('[a-z]+', 'g'))
      ? true
      : this.setPasswordForm.setErrors({ noLowercase: true });
  }

  private hasDigits(password: string) {
    return password.match(new RegExp('[0-9]+', 'g'))
      ? true
      : this.setPasswordForm.setErrors({ noDigits: true });
  }

  private hasSpecialCharacters(password: string) {
    return password.match(new RegExp('[!@#$%^&*]+', 'g'))
      ? true
      : this.setPasswordForm.setErrors({ noSpecialCharacter: true });
  }

  onSubmit() {
    if (this.checkPasswords()) {
      if (this.passwordPatternCheck()) {
        console.log(this.setPasswordForm.value);
      }
    }
  }
}
