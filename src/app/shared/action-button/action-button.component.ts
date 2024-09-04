import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent {
  @Output() click = new EventEmitter<void>();
  @Input() text: string | null = '';
  @Input() iconBtn: boolean = false;
  @Input() badge: boolean = false;
  @Input() cartItemsQuantity: number = 0;

  onClick(): void {
    console.log('text', this.text)
    this.click.emit();
  }
}
