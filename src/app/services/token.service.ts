import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService, private userService: UserService) {}

  public signOut(){
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.delete(USER_KEY);
  }

  public saveToken(token: string) {
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.set(TOKEN_KEY, token);

  }
  public getToken(){
    return this.cookieService.get(TOKEN_KEY);
  }

  public saveUser(userInfo:any){
    this.cookieService.delete(USER_KEY);
    this.cookieService.set(USER_KEY, JSON.stringify(userInfo));
  }

  public getUser(){
    if(this.cookieService.check(USER_KEY))
      return JSON.parse(this.cookieService.get(USER_KEY));
    else return {};
  }

}
