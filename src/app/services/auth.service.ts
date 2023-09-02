import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = 'http://localhost:8080/api/v1/auth';
  token:any;

  constructor(private http: HttpClient, private tokenService:TokenService) {}

  register(
    firstName: any,
    lastName: any,
    userName: any,
    email: any,
    password: any,
  ) {
    let url = this.authUrl + '/register';
    return this.http
      .post<any>(url, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  login(email: any, password: any) {
    let url = this.authUrl + '/login';
    return this.http
      .post<any>(url, { email: email, password: password })
      .pipe(retry(1), catchError(this.handleError));
    // console.log("In AuthService.login()");
  }

  isLoggedIn() {
    if(this.tokenService.getToken()){
      return true;
    }
    return false;
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
