import { AbstractControl, ValidationErrors } from '@angular/forms';

function passwordStrength(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumericChar = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid =
    hasUpperCase && hasLowerCase && hasNumericChar && hasSpecialChar;

  const validationErrors = {
    hasUpperCase: !hasUpperCase,
    hasLowerCase: !hasLowerCase,
    hasNumericChar: !hasNumericChar,
    hasSpecialChar: !hasSpecialChar
  };

  return isPasswordValid ? null : validationErrors;
}

function matchPassword(control: AbstractControl): ValidationErrors | null {
  const confirmPassword = control.value;
  const password = control?.parent?.get('password')?.value;
  if (!password) return null;

  return confirmPassword === password ? null : { mismatch: true };
}

const PasswordValidator = {
  passwordStrength,
  matchPassword
};

export default PasswordValidator;
