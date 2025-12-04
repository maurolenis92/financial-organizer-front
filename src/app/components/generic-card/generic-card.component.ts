import { SlicePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fs-generic-card',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss',
})
export class GenericCardComponent {
  @Input() public title: string = '';
  @Input() public id: string = '';
  @Input() public clickable: boolean = true;
  @Input() public disabled: boolean = false;
  @Input() public titleLength: number = 20;
  @Input() public ariaLabel?: string;
  @Output() public cardClick = new EventEmitter<void>();

  public handleClick(): void {
    if (!this.clickable || this.disabled) return;
    this.cardClick.emit();
  }

  public handleKeydown(event: KeyboardEvent): void {
    if (!this.clickable || this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
