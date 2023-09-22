import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { FourthComponent } from './fourth/fourth.component';
import { FifthComponent } from './fifth/fifth.component';

const routes: Routes = [
//  {path: '', redirectTo: 'first', pathMatch: 'full'},
  {path: '',  component: FirstComponent},
  {path: 'about', component: SecondComponent},
  {path: '#', redirectTo: '', pathMatch: 'full'},
  {path: 'showroom', component: ThirdComponent},
  {path: 'showroom/sci-fi', component: FourthComponent},
  {path: 'showroom/funny', component: FifthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
