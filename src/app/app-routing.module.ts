import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
  {path:"home", loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path:"signin", component: SignInComponent},
  {path: '', redirectTo:"home", pathMatch: 'full'},
  {path: "**", loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
