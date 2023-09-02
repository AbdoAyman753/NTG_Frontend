import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { ErrorModule } from './pages/error/error.module';
import { StoreModule } from './pages/store/store.module';
import { CartComponent } from './pages/cart/cart.component';
import { GamesService } from './services/games.service';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './services/user.service';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    SignUpComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    StoreModule,
    ErrorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [GamesService,AuthService, CookieService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
