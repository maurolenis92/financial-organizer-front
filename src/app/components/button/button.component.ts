import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fs-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() public label: string = '';
  @Input() public icon: string = '';
  @Input() public type: 'button' | 'submit' | 'reset' = 'button';
  @Input() public disabled: boolean = false;
  @Input() public loading: boolean = false;
  @Input() public id: string = '';
  @Input() public width: string = '100%';
  @Input() public variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
}
