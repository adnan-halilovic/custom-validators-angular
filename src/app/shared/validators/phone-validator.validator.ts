import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function PhoneValidator(
  control: AbstractControl
): ValidationErrors | null {
  const phoneRegex = /^\d{10}$/;
  const valid = phoneRegex.test(control.value);
  return valid ? null : { invalidPhone: true };
}
