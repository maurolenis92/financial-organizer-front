// TODO: PENDING REVIEW
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ValidatorValue } from '../../models/validator-value';
import { getErrorMessage } from '../../utils/custom-validators';
import { SelectOption } from '../../models/select.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'fs-select-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input() public label: string = '';
  @Input() public placeholder: string = 'Selecciona una opción';
  @Input() public id: string = '';
  @Input() public width: string = '100%';
  @Input() public options: SelectOption[] = [];
  @Input() public valueValidator: ValidatorValue = {};
  @Input() public searchable: boolean = false;

  public disabled: boolean = false;
  public value: string = '';

  private onChange = (value: any): void => {};
  public onTouched = (): void => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // Implementación de ControlValueAccessor
  public writeValue(value: any): void {
    this.value = value || '';
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Método cuando el select cambia
  public onSelectChange(event: any): void {
    const selectValue = event.value;
    this.value = selectValue;
    this.onChange(this.value);
    this.onTouched();
  }

  // Getter para acceder a los errores
  public get control(): any {
    return this.ngControl?.control;
  }

  // Getter para saber si mostrar errores
  public get showErrors(): boolean {
    return !!(this.control && this.control.invalid && this.control.dirty);
  }

  // Getter para obtener el mensaje de error
  public get errorMessage(): string {
    return getErrorMessage(this.control, this.valueValidator);
  }
}
