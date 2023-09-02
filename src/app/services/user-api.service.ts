import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  // Define API
  apiURL = 'http://localhost:8080/api/v1/users';
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    }), // Include this line to send cookies or other credentials
  };

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  updateCart(user: any): Observable<any> {
    let updatedUser = new User();
    updatedUser.id = user.id;
    updatedUser.cartGames = user.cartGames;
    let url = this.apiURL + '/cart';
    return this.http
      .post<any>(url, updatedUser, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateLibrary(user: any): Observable<any> {
    let updatedUser = new User();
    updatedUser.id = user.id;
    updatedUser.library = [...user.cartGames, ...user.library];
    updatedUser.library.map((element:any)=>{
      delete element.categories;
      return element;
    });
    let url = this.apiURL + '/library';
    return this.http
      .post<any>(url, updatedUser, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUsers(): Observable<any> {
    return this.http
      .get<any>(this.apiURL, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
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
    console.log(error);

    return throwError(() => {
      return errorMessage;
    });
  }
}
