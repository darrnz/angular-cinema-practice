import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { StoreComponent } from './components/store/store.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { ConctactComponent } from './components/conctact/conctact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: MainPageComponent },
  { path: 'store', component: StoreComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'contact', component: ConctactComponent },
  { path: '*', redirectTo: '/home' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
