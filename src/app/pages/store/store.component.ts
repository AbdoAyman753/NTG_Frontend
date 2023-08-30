import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [GamesService]
})
export class StoreComponent implements OnInit {
  games:any = [];
  constructor(public gamesService: GamesService){

  }
  ngOnInit() {
    this.gamesService.getGames().subscribe((data:any)=>{
    this.games = data;});
  }

  filterGames(event:any) {
    this.games = event;
  }
}
