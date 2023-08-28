import { Component, Input } from '@angular/core';
import { Game } from 'src/app/entities/Game';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() game: any;
  constructor(){
  }
}
