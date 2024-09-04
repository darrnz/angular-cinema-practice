import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from './action-button/action-button.component';
import { MaterialModule } from '../material.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { StoreItemComponent } from './store-item/store-item.component';
import { CurrencyConverterPipe } from './pipes/currency-converter.pipe';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [
    ActionButtonComponent,
    MovieCardComponent,
    StoreItemComponent,
    CurrencyConverterPipe,
    DatePickerComponent,
    TicketItemComponent,
    ModalDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, MatNativeDateModule],
  exports: [
    ActionButtonComponent,
    MovieCardComponent,
    StoreItemComponent,
    CurrencyConverterPipe,
    DatePickerComponent,
    MatNativeDateModule,
    TicketItemComponent
  ],
})
export class SharedModule {}
