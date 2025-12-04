import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../../components/input/input.component';
import { SelectInputComponent } from '../../../../../components/select-input/select-input.component';
import { DatePickerComponent } from '../../../../../components/date-picker/date-picker.component';
import { SelectOption } from '../../../../../models/select.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-budget-info-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    SelectInputComponent,
    DatePickerComponent,
    MatIconModule,
  ],
  templateUrl: './budget-info-step.component.html',
  styleUrl: './budget-info-step.component.scss',
})
export class BudgetInfoStepComponent {
  @Input() public formGroup!: FormGroup;
  public currencyOptions: SelectOption[] = [
    { label: 'Dólar estadounidense', value: 'USD' },
    { label: 'Euro', value: 'EUR' },
    { label: 'Peso Colombiano', value: 'COP' },
  ];
}
