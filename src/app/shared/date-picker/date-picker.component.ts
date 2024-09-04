import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
  @Input() selectedTicketsForm!: FormGroup;
  @Input() elem: string = '';
  @Input() patchVal: string = '';
  @Input() isRequired = false;
  @Output() eventDate: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  getDate($event: any) {
    if ($event.value !== null) {
      this.eventDate.emit($event.value);
    }
  }

  ngOnInit() {
    if (this.selectedTicketsForm) {
      this.createForm();
    }
    if (this.patchVal) {
      this.selectedTicketsForm?.controls[this.elem].patchValue(this.patchVal);
    }
  }

  createForm() {
    const control = this.isRequired
      ? new FormControl(this.patchVal || '', Validators.required)
      : new FormControl(this.patchVal || '');

    if (!this.selectedTicketsForm?.contains(this.elem)) {
      this.selectedTicketsForm?.addControl(this.elem, control);
    }
  }
}
