import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Game } from 'src/app/entities/Game';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit, OnChanges {
  @Input() game: any;
  user: any;

  hovered: boolean = false;
  inCart: boolean = false;
  owned: boolean = false;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private authService: AuthService,
    private userApiService: UserApiService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.authService.isLoggedIn()) {
      // console.log(this.hovered, this.inCart);
      this.user?.cartGames.forEach((element: any) => {
        if (element?.id === this.game?.id) {
          // console.log("In game");
          this.inCart = true;
          return;
        }
      });
      this.user?.library.forEach((element: any) => {
        if (element?.id === this.game?.id) {
          // console.log("In game");
          this.owned = true;
        }
      });
    }
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
      // console.log(data.cartGames);
      if (this.authService.isLoggedIn()) {
        data?.cartGames.forEach((element: any) => {
          if (element?.id === this.game?.id) {
            // console.log("In game");
            this.inCart = true;
            return;
          }
        });
        data?.library.forEach((element: any) => {
          if (element?.id === this.game?.id) {
            // console.log("In game");
            this.owned = true;
          }
        });
      }
    });
  }

  toggleCartState() {
    if(this.authService.isLoggedIn()){
      if (!this.inCart) {
        this.user?.cartGames.push(this.game);
        this.inCart = true;
        // console.log(this.user?.cartGames);
        //update userService and tokenService
        // this.userService.updateUser(this.user);
        // this.tokenService.saveUser(this.user);
      } else {
        this.user?.cartGames.splice(this.user?.cartGames.indexOf(this.game), 1);
        this.inCart = false;
        // console.log(this.user?.cartGames);
        //update userService and tokenService
        // this.userService.updateUser(this.user);
        // this.tokenService.saveUser(this.user);
      }
      console.log("before update");
      this.userService.updateUser(this.user);
      this.tokenService.saveUser(this.user);
      // this.updateCart();
    }
  }

  updateCart() {
    this.userApiService
      .updateCart(this.tokenService.getUser())
      .subscribe((data) => {
        // this.userService.updateUser(data);
        // this.tokenService.saveUser(data);
        console.log(data);
      });
    // this.userApiService.getUsers().subscribe(data=>console.log(data));
    // console.log(this.tokenService.getUser());
    // console.log(this.tokenService.getToken());
  }

  @HostListener('window:beforeunload')
  sendDataBeforeUnload() {
    this.updateCart();
  }
}
