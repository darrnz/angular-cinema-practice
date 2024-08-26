import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from './action-button/action-button.component';
import { MaterialModule } from '../material.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { StoreItemComponent } from './store-item/store-item.component';

@NgModule({
  declarations: [
    ActionButtonComponent,
    MovieCardComponent,
    StoreItemComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    ActionButtonComponent,
    MovieCardComponent,
    StoreItemComponent,
  ],
})
export class SharedModule {}
