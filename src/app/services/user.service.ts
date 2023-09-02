import { Injectable, Injector, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  // private userSubject = new BehaviorSubject<any>(null);
  // user$:Observable<any>;
  // constructor(private userSubject:BehaviorSubject<any>) {
  //   this.user$ = this.userSubject.asObservable();
  // }
  constructor(){
  }
  // ngOnInit(): void {
  //   this.doSomething();
  // }
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  // doSomething(){
  //   const tokenService = this.injector.get(TokenService);
  //   this.updateUser(tokenService.getUser() || {});
  // }

  updateUser(userInfo: any) {
    this.userSubject.next(userInfo);
  }

  signOut(){
    this.updateUser({});
  }

  getUser(){
    return this.user$;
  }
}
