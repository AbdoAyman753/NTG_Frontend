import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';


@NgModule({
  declarations: [
    StoreComponent,
    FilterComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ],
  exports:[StoreComponent]
})
export class StoreModule { }
