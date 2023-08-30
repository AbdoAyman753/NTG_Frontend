import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Game } from '../entities/Game';
import { Category } from '../entities/Category';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  // Define API
  apiURL = 'http://localhost:8080/api/v1/games';
  categoriesURL = 'http://localhost:8080/api/v1/categories';
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  getGames(): Observable<Game> {
    let url = this.apiURL +"?minPrice=0&maxPrice=10000";
    return this.http
      .get<Game>(url)
      .pipe(retry(1), catchError(this.handleError));
  }
  // getGamesFiltered(minPrice: number, maxPrice: number,categories:[]): Observable<Game>{
  //   return this.http
  //               .get<Game>(this.apiURL+"?minPrice="+minPrice
  //                         +"&maxPrice="+maxPrice
  //                         +"&categories="+categories)
  //               .pipe(retry(1), catchError(this.handleError));
  // }
  getGamesFiltered(minPrice: number, maxPrice: number,categories:[]){
    let url = this.apiURL+"?minPrice="+minPrice+"&maxPrice="+maxPrice;
    if(categories.length != 0){
      url += "&categories=";
      categories.forEach((category:any, index:number) => {
        url += category?.id;
        if(index != categories.length -1){
          url += ","
        }
      });
    }
    // console.log(url);
    return this.http
      .get<Game>(url)
      .pipe(retry(1), catchError(this.handleError));
  }
  getCategories():Observable<Category>{
    return this.http
          .get<Category>(this.categoriesURL)
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
    return throwError(() => {
      return errorMessage;
    });
  }
}
