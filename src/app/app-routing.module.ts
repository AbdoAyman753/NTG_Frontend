import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CartComponent } from './pages/cart/cart.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard, NegateAuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"home", loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path:"store", loadChildren: () => import('./pages/store/store.module').then(m => m.StoreModule)},
  {path:"cart", component: CartComponent,canActivate:[AuthGuard]},
  {path:"about", component: AboutComponent},
  {path:"signin", component: SignInComponent, canActivate:[NegateAuthGuard]},
  {path:"signup", component: SignUpComponent, canActivate:[NegateAuthGuard]},
  {path: '', redirectTo:"home", pathMatch: 'full'},
  {path: "**", loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
