import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidatorValue } from '../../models/validator-value';
import { getErrorMessage } from '../../utils/custom-validators';
import { NgxCurrencyDirective } from 'ngx-currency';

// TODO: ESLint Adjustments Required - Este archivo está temporalmente excluido de ESLint
// Para habilitar ESLint nuevamente, realizar los siguientes ajustes:
// 1. Agregar modificadores de accesibilidad explícitos (public/private) a todas las propiedades
// 2. Agregar tipos de retorno explícitos a todos los métodos y getters
// 3. Cambiar tipos 'any' por tipos más específicos (fn: any -> fn: (value: string) => void)
// 4. Validar accesibilidad del constructor y parámetros
// 5. Considerar hacer privadas las propiedades que no se usan en el template

@Component({
  selector: 'fs-input',
  standalone: true,
  imports: [CommonModule, NgxCurrencyDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() public label: string = '';
  @Input() public type: string = 'text';
  @Input() public placeholder: string = '';
  @Input() public id: string = '';
  @Input() public width: string = '100%';
  @Input() public currencyMask: boolean = false;
  @Input() public currencyFormat: string = 'COP';
  @Input() public valueValidator: ValidatorValue = {};
  @Input() public variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  internalControl!: FormControl;

  public disabled: boolean = false;
  public value: string = '';

  private onChange = (value: any) => {};
  public onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.currencyMask && this.ngControl?.control) {
      this.internalControl = this.ngControl.control as FormControl;
    }
  }

  public get currencyOptions() {
    return {
      prefix: this.getCurrencyPrefix(),
      thousands: this.getCurrencyThousands(),
      decimal: this.getCurrencyDecimal(),
      align: 'left',
      allowNegative: false,
      precision: 2,
    };
  }

  // Implementación de ControlValueAccessor
  public writeValue(value: any): void {
    this.value = value || '';

    if (this.currencyMask && this.internalControl) {
      this.internalControl.setValue(value, { emitEvent: false });
    }
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

  // Método cuando el input cambia
  public onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
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

  // Getter para obtener el primer error
  public get errorKey(): string | null {
    if (this.control && this.control.errors) {
      return Object.keys(this.control.errors)[0];
    }
    return null;
  }

  public get errorMessage(): string {
    let error = '';

    if (!this.control || !this.control.errors) {
      return '';
    }
    if (this.control.errors['onlyLetters']) {
      return getErrorMessage('onlyLetters', this.valueValidator);
    } else if (this.control.errors['onlyNumbers']) {
      return getErrorMessage('onlyNumbers', this.valueValidator);
    }
    error = getErrorMessage(Object.keys(this.control.errors)[0], this.valueValidator);
    return error;
  }

  private getCurrencyPrefix(): string {
    const prefixes: { [key: string]: string } = {
      USD: '$',
      COP: '$',
      EUR: '€',
      GBP: '£',
      MXN: '$',
    };
    return prefixes[this.currencyFormat] || '$';
  }

  private getCurrencyThousands(): string {
    const separators: { [key: string]: string } = {
      USD: ',',
      COP: '.',
      EUR: '.',
      GBP: ',',
      MXN: ',',
    };
    return separators[this.currencyFormat] || ',';
  }

  private getCurrencyDecimal(): string {
    const decimals: { [key: string]: string } = {
      USD: '.',
      COP: ',',
      EUR: ',',
      GBP: '.',
      MXN: '.',
    };
    return decimals[this.currencyFormat] || '.';
  }
}
