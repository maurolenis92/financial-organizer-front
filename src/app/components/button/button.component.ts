import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'fs-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnChanges {
  @Input() public label: string = 'Button';
  @Input() public type: 'button' | 'submit' | 'reset' = 'button';
  @Input() public disabled: boolean = false;
  @Input() public loading: boolean = false;
  @Input() public id: string = '';
  @Input() public width: string = '100%';
  @Input() public variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  public ngOnChanges(): void {
    if (this.loading) {
      this.disabled = true;
    }
  }
}
