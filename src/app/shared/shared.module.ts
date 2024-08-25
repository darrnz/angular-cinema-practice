import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from './action-button/action-button.component';
import { MaterialModule } from '../material.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { StoreItemComponent } from './store-item/store-item.component';
import { TicketItemComponent } from './ticket-item/ticket-item.component';

@NgModule({
  declarations: [
    ActionButtonComponent,
    MovieCardComponent,
    StoreItemComponent,
    TicketItemComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    ActionButtonComponent,
    MovieCardComponent,
    StoreItemComponent,
    TicketItemComponent,
  ],
})
export class SharedModule {}
