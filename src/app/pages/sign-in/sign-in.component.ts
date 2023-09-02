import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  emailValid = true;
  passwordValid = true;

  constructor(
    public authService: AuthService,
    private _router: Router,
    private tokenService: TokenService,
    private userService: UserService
  ) { }
  signInValidation = new FormGroup({
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
  });

  checkEmail() {
    this.emailValid = this.signInValidation.controls['email'].valid;
  }

  checkPassword() {
    this.passwordValid = this.signInValidation.controls['password'].valid;
  }

  signIn() {
    if (
      this.signInValidation.controls['email'].valid &&
      this.signInValidation.controls['password'].valid
    ) {
      // Send request to the server
      this.authService.login(this.signInValidation.controls['email'].value,
      this.signInValidation.controls['password'].value).subscribe(data=>{
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data.user);
        this.userService.updateUser(data.user);
        this._router.navigate(['/store']);
        // console.log(data);

      });
    } else {
      this.emailValid = this.signInValidation.controls['email'].valid;
      this.passwordValid = this.signInValidation.controls['password'].valid;
    }
  }
}
