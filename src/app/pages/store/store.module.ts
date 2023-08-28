import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { GamesService } from 'src/app/services/games.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';


@NgModule({
  declarations: [
    StoreComponent,
    FilterComponent,
    ItemCardComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ],
  exports:[StoreComponent],
  providers:[GamesService]
})
export class StoreModule { }
