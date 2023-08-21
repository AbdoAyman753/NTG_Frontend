import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      // {
      //   title: 'Dark Souls III',
      //   id: 2,
      //   price: 9.99,
      //   description: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
      //   coverImage: 'assets/fortnite.jpg',
      // },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'title',
    'price',
    'description',
    'totalPrice',
    'action'
  ];




  constructor() {}

  ngOnInit(): void {}
}
