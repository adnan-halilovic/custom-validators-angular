import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function CreditCardValidator(
  control: AbstractControl
): ValidationErrors | null {
  const cardNumber = control.value;
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = +cardNumber[i];
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit = digit - 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0 && cardNumber.length === 16
    ? null
    : { invalidCardNumber: true };
}
