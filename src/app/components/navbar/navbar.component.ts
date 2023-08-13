import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  profileMenuToggle: boolean = false;
  toggleMenu: boolean = false;
  cartMenuToggle: boolean = false;

}
