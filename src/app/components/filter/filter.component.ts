import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/entities/Category';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [GamesService]
})
export class FilterComponent implements OnInit{
  // Gui Settings
  priceFilterToggle: boolean = false;
  categoryFilterToggle: boolean = false;

  //  Initialization parameters
  categories:any;
  catSize:any;

  // Filtering Options
  filterCategories:any;
  minPrice:number = 0;
  maxPrice:number = 10000;

  // Filtered Games
  @Output() filteredGamesEmitter:any;

  constructor(public gameService: GamesService){
    this.filterCategories = [];
    this.filteredGamesEmitter = new EventEmitter();
  }
  ngOnInit(): void {
    this.gameService.getCategories().subscribe((data:any)=>{
      this.categories = data;
      this.catSize = this.categories.length;
    });
  }

  changeMinPrice(event: any):void {
    this.minPrice = event.target.value || 0;
    if(this.maxPrice <= this.minPrice) {
      this.maxPrice = +this.minPrice + 1;
    }
    // console.log("Min Price : "+this.minPrice);
    // console.log("Max Price : "+this.maxPrice);
  }

  changeMaxPrice(event: any):void {
    this.maxPrice = event.target.value || this.maxPrice;
    if(this.maxPrice <= this.minPrice) {
      this.maxPrice = +this.minPrice + 1;
    }
    // console.log("Min Price : "+this.minPrice);
    // console.log("Max Price : "+this.maxPrice);
  }

  changeCategoryFilter(event: any):void {
    if(event.target.checked == true){
      this.filterCategories.push({id:event.target.id, name:event.target.value})
      // console.log(this.filterCategories);
    }
    else{
      this.filterCategories.splice(
        this.filterCategories.indexOf({id:event.target.id, name:event.target.value}), 1);
        // console.log(this.filterCategories);
    }

  }
  applyFilters(){
    this.gameService.getGamesFiltered(this.minPrice, this.maxPrice, this.filterCategories)
    .subscribe((data:any)=>{ this.filteredGamesEmitter.emit(data); });
    // this.gameService.getGamesFiltered(this.minPrice, this.maxPrice, this.filterCategories);

    // this.filteredGamesEmitter.emit([{},{},{}])
  }
}
