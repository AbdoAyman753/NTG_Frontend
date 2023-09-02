import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnChanges {
  profileMenuToggle: boolean = false;
  toggleMenu: boolean = false;
  cartMenuToggle: boolean = false;
  user:any;
  cartBadge: any;
  cartItems: any;

  constructor(
    public authService: AuthService,
    private tokenService: TokenService,
    private _router: Router,
    public userService: UserService,
    public userApiService: UserApiService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {

    // this.cartBadge = this.tokenService.getUser()?.cartGames?.length();
    // this.cartItems = this.tokenService.getUser()?.cartGames;
  }
  ngOnInit(): void {
    this.userService.getUser().subscribe(data=>{
      // console.log(data);

      this.user = data;
      this.cartItems = data?.cartGames;
      this.cartBadge = data?.cartGames?.length;
    });
  }

  logOut() {
    this.updateCart();
    this.tokenService.signOut();
    this.userService.signOut();
    this._router.navigate(['/home']);
  }

  getTotalPrice(){
    let total = 0;
    this.cartItems.forEach((element: any) => {
      total += element.price;
    });
    return total;
  }

  emptyCart(){
    this.user.cartGames = [];
    this.userService.updateUser(this.user);
    this.tokenService.saveUser(this.user);
    this._router.navigate(['/cart'])
  }

  updateCart(){
    this.userApiService.updateCart(this.tokenService.getUser()).subscribe(data=>{
      this.userService.updateUser(data);
      this.tokenService.saveUser(data);
      // console.log(data);
    })
    // this.userApiService.getUsers().subscribe(data=>console.log(data));

    // console.log(this.tokenService.getUser());
    // console.log(this.tokenService.getToken());
  }
}
