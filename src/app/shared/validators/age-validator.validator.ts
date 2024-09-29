import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function MinimumAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= minAge ? null : { ageTooLow: { requiredAge: minAge } };
  };
}
