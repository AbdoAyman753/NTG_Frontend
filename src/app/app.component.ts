import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GamesService } from './services/games.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { UserApiService } from './services/user-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GamesService],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'NTG_Frontend';


  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private userApiService: UserApiService
  ) {}
  ngOnInit(): void {
    this.userService.updateUser(this.tokenService.getUser());
    // console.log(this.tokenService.getUser());
    // window.addEventListener('beforeunload', this.updateCart);

  }

  ngOnDestroy(): void {
    // window.removeEventListener('beforeunload',this.updateCart);
  }

  @HostListener('window:beforeunload')
  sendDataBeforeUnload() {
    this.userApiService
      .updateCart(this.tokenService.getUser())
      .subscribe((data) => {
        // this.userService.updateUser(data);
        // this.tokenService.saveUser(data);
        console.log(data);
      });
  }
}
