/*  eslint-disable  @typescript-eslint/no-explicit-any */

import { ValidatorFn } from '@angular/forms';
import { ValidatorValue } from '../models/validator-value';

export const OnlyNumbersValidator = (): ValidatorFn => {
  const validator: ValidatorFn = control => {
    if (!control.value) {
      return null;
    }
    const onlyNumbers = /^[0-9]*$/;
    return onlyNumbers.test(control.value) ? null : { onlyNumbers: true };
  };

  (validator as any).type = 'OnlyNumbersValidator';

  return validator;
};

// export const MatchValidator = (options: SelectOptions[]): ValidatorFn => {
//   return (control) => {
//     if (!control.value) {
//       return null;
//     }
//     const match = options.some((option) => option.value === control.value);
//     return match ? null : { notMatch: true };
//   };
// };

export const TwoDecimalValidator = (): ValidatorFn => {
  const validator: ValidatorFn = control => {
    if (!control.value) {
      return null;
    }
    const onlyNumbers = /^\d+(\.\d{0,2})?$/; // /^[0-9]*\.?[0-9]{0,2}$/
    return onlyNumbers.test(control.value) ? null : { TwoDecimal: true };
  };

  (validator as any).type = 'TwoDecimalValidator';

  return validator;
};

export const onlyNumbersWithSpacesValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const onlyNumbers = /^[0-9 ]*$/;
    return onlyNumbers.test(control.value) ? null : { onlyNumbers: true };
  };
};

export const OnlyLettersValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const onlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    return onlyLetters.test(control.value) ? null : { onlyLetters: true };
  };
};

export const onlyLettersWithSpacesValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const onlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    return onlyLetters.test(control.value) ? null : { onlyLetters: true };
  };
};

export const AlphanumericValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const alphanumeric = /^[a-zA-Z0-9ñÑ]*$/;
    return alphanumeric.test(control.value) ? null : { alphanumeric: true };
  };
};

export const alphanumericWithSpacesValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const alphanumeric = /^[a-zA-Z0-9ñÑ ]*$/;
    return alphanumeric.test(control.value) ? null : { alphanumeric: true };
  };
};

export const EmailValidator = (): ValidatorFn => {
  const validator: ValidatorFn = control => {
    if (!control.value) {
      return null;
    }
    const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email.test(control.value) ? null : { email: true };
  };

  (validator as any).type = 'EmailValidator';

  return validator;
};

export const PhoneValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const phone = /^[0-9]{10}$/;
    return phone.test(control.value) ? null : { phone: true };
  };
};

export const PasswordValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return password.test(control.value) ? null : { password: true };
  };
};

export const DateValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const date = /^\d{4}-\d{2}-\d{2}$/;
    return date.test(control.value) ? null : { date: true };
  };
};

export const TimeValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const time = /^\d{2}:\d{2}$/;
    return time.test(control.value) ? null : { time: true };
  };
};

export const DateAndTimeValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const dateAndTime = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    return dateAndTime.test(control.value) ? null : { dateAndTime: true };
  };
};

export const UrlValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const url = /^(http|https):\/\/[^ "]+$/;
    return url.test(control.value) ? null : { url: true };
  };
};

export const CurrencyValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const currency = /^\d+(\.\d{1,2})?$/;
    return currency.test(control.value) ? null : { currency: true };
  };
};

export const PercentageValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const percentage = /^\d+(\.\d{1,2})?$/;
    return percentage.test(control.value) ? null : { percentage: true };
  };
};

export const RangeValidatorLength = (
  minCharacters: number,
  maxCharacters: number
): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const range =
      control.value.length >= minCharacters && control.value.length <= maxCharacters;
    return range ? null : { rangeLength: true };
  };
};

export const RangeValidator = (min: number, max: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const range = control.value >= min && control.value <= max;
    return range ? null : { range: true };
  };
};

export const RangeWithcharactersValidator = (
  min: number,
  max: number,
  maxCharacters: number
): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }

    if (control.value.length > maxCharacters) {
      return { maxLength: true };
    }
    const range = control.value >= min && control.value <= max;
    return range ? null : { range: true };
  };
};

export const MinValidator = (min: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const minValidator = control.value >= min;
    return minValidator ? null : { min: true };
  };
};

export const MaxValidator = (max: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const maxValidator = control.value <= max;
    return maxValidator ? null : { max: true };
  };
};

export const MinLengthValidator = (minCharacters: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const minLength = control.value.length >= minCharacters;
    return minLength ? null : { minLength: true };
  };
};

export const MinLengthValidatorWithoutSpaces = (minCharacters: number): ValidatorFn => {
  return control => {
    if (!control.value || control.value.toString().length === 0) {
      return { minLength: true };
    }

    const value = control.value.toString();
    const minLength = value.length >= minCharacters;

    return minLength ? null : { minLength: true };
  };
};

export const MaxLengthValidator = (maxCharacters: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const maxLength = control.value.length <= maxCharacters;
    return maxLength ? null : { maxLength: true };
  };
};

export const EqualLengthValidator = (length: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const equalLength = control.value.length === length;
    return equalLength ? null : { equalLength: true };
  };
};

export const EqualValidator = (textValue: string): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const equal = control.value === textValue;
    return equal ? null : { equal: true };
  };
};

export const NotEqualValidator = (textValue: string): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const notEqual = control.value !== textValue;
    return notEqual ? null : { notEqual: true };
  };
};

export const GreaterThanValidator = (value: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const greaterThan = control.value > value;
    return greaterThan ? null : { greaterThan: true };
  };
};

export const LessThanValidator = (value: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const lessThan = control.value < value;
    return lessThan ? null : { lessThan: true };
  };
};

export const GreaterThanOrEqualValidator = (value: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const greaterThanOrEqual = control.value >= value;
    return greaterThanOrEqual ? null : { greaterThanOrEqual: true };
  };
};

export const LessThanOrEqualValidator = (value: number): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const lessThanOrEqual = control.value <= value;
    return lessThanOrEqual ? null : { lessThanOrEqual: true };
  };
};

export const PatternValidator = (pattern: string): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }
    const patternValidator = new RegExp(pattern);
    return patternValidator.test(control.value) ? null : { pattern: true };
  };
};

export const OnlyNumbersAndDashValidator = (): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }

    const pattern = /^\d{1,10}-?\d{1}$/;
    const regex = new RegExp(pattern);

    return regex.test(control.value) ? null : { onlyNumbersAndDash: true };
  };
};

export const getErrorMessage = (
  validatorName: string,
  validatorValue?: ValidatorValue
): string => {
  const messages: any = {
    onlyNumbers: 'Solo se permiten números',
    TwoDecimal: 'Solo se permiten números, un punto y máximo dos decimales',
    onlyLetters: 'Solo se permiten letras',
    alphanumeric: 'Solo se permiten letras y números',
    email: 'Correo electrónico inválido',
    phone: 'Número de teléfono inválido',
    password:
      'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número',
    date: 'Formato de fecha inválido',
    time: 'Formato de hora inválido',
    dateAndTime: 'Formato de fecha y hora inválido',
    url: 'URL inválida',
    currency: 'Formato de moneda inválido',
    percentage: 'Formato de porcentaje inválido',
    range: `El valor debe estar entre ${validatorValue?.min} y ${validatorValue?.max}`,
    rangeLength: `El valor debe tener entre ${validatorValue?.minCharacters} y ${validatorValue?.maxCharacters} caracteres`,
    min: `El valor debe ser mayor o igual a ${validatorValue?.min}`,
    max: `El valor debe ser menor o igual a ${validatorValue?.max}`,
    minLength: `El valor debe tener al menos ${validatorValue?.minCharacters} caracteres`,
    maxLength: `El valor debe tener como máximo ${validatorValue?.maxCharacters} caracteres`,
    equalLength: `El valor debe tener ${validatorValue?.length} caracteres`,
    equal: `El valor debe ser igual a ${validatorValue?.textValue}`,
    notEqual: `El valor debe ser diferente de ${validatorValue?.textValue}`,
    greaterThan: `El valor debe ser mayor que ${validatorValue?.value}`,
    lessThan: `El valor debe ser menor que ${validatorValue?.value}`,
    greaterThanOrEqual: `El valor debe ser mayor o igual a ${validatorValue?.value}`,
    lessThanOrEqual: `El valor debe ser menor o igual a ${validatorValue?.value}`,
    pattern: `El valor debe coincidir con el patrón ${validatorValue?.pattern}`,
    required: 'Campo requerido',
    notMatch: 'El valor no coincide con las opciones disponibles',
    noSpaces: 'El campo no puede contener espacios',
    onlyNumbersAndDash: 'Formato de NIT inválido, solo se permiten números y un guión',
    invoiceNumberExists: 'El número de la factura ya existe.',
    codeDuplicadte: 'Código duplicado',
  };
  return messages[validatorName] || 'Valor inválido';
};
