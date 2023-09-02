import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private userApiService: UserApiService
  ) {}
  user: any;
  successModal = false;

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  getTotalPrice() {
    let total = 0;
    this.user.cartGames.forEach((element: any) => {
      total += element.price;
    });
    return total;
  }

  removeIterm(item: any) {
    this.user?.cartGames.splice(this.user?.cartGames.indexOf(item), 1);
    //update userService and tokenService
    this.userService.updateUser(this.user);
    this.tokenService.saveUser(this.user);
  }

  checkOut() {
    // console.log([...this.user.cartGames, ...this.user.library]);
    this.userApiService.updateLibrary(this.user).subscribe(data => {
      console.log(data);
      if(data){
        this.user.library = this.user.cartGames;
        this.user.cartGames = [];
        data.cartGames = [];
        this.userService.updateUser(data);
        this.tokenService.saveUser(data);
        this.successModal = true;
        setTimeout(() => {
          this.successModal = false;
        }, 3000);
      }
    });
  }
}
