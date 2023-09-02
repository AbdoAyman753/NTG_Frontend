import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  firstNameValid = true;
  lastNameValid = true;
  userNameValid = true;
  emailValid = true;
  passwordValid = true;
  confirmPasswordValid = true;

  loading = false;
  registered = false;

  constructor(public authService: AuthService, private _router: Router){}

  signUpValidation = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  checkFirstName() {
    this.firstNameValid = this.signUpValidation.controls['firstName'].valid;
  }

  checkLastName() {
    this.lastNameValid = this.signUpValidation.controls['lastName'].valid;
  }

  checkUserName() {
    this.userNameValid = this.signUpValidation.controls['userName'].valid;
  }

  checkEmail() {
    this.emailValid = this.signUpValidation.controls['email'].valid;
  }

  checkPassword() {
    this.passwordValid = this.signUpValidation.controls['password'].valid;
  }
  checkConfirmPassword() {
    if (
      this.signUpValidation.controls['password'].valid &&
      this.signUpValidation.controls['confirmPassword'].value ==
        this.signUpValidation.controls['password'].value
    ) {
      this.confirmPasswordValid =
        this.signUpValidation.controls['confirmPassword'].valid;
    } else {
      this.confirmPasswordValid = false;
    }
  }
  signUp() {
    if (
      this.signUpValidation.controls['firstName'].valid &&
      this.signUpValidation.controls['lastName'].valid &&
      this.signUpValidation.controls['userName'].valid &&
      this.signUpValidation.controls['email'].valid &&
      this.signUpValidation.controls['password'].valid &&
      this.signUpValidation.controls['confirmPassword'].valid &&
      this.signUpValidation.controls['password'].value ==
        this.signUpValidation.controls['confirmPassword'].value
    ) {
      console.log("Sending request");
      this.loading = true;
      // Send request to the server
      this.authService.register(
        this.signUpValidation.controls['firstName'].value,
        this.signUpValidation.controls['lastName'].value,
        this.signUpValidation.controls['userName'].value,
        this.signUpValidation.controls['email'].value,
        this.signUpValidation.controls['password'].value
      ).subscribe(data=>{
        this.authService.token = data?.token;
        this.loading = false;
        this.registered = true;
        setTimeout(()=>{this._router.navigate(['/signin'])},5000);
        // console.log(data);
      });
    }
    else{
      this.checkFirstName();
      this.checkLastName();
      this.checkUserName();
      this.checkEmail();
      this.checkPassword();
      this.checkConfirmPassword();
    }
  }
}
