import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { ErrorComponent } from './pages/error/error.component';
import { ErrorModule } from './pages/error/error.module';
import { StoreComponent } from './pages/store/store.component';
import { StoreModule } from './pages/store/store.module';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    StoreModule,
    ErrorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
