import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function EmailDomainsValidator(
  allowedDomains: string[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (email) {
      const domain = email.substring(email.lastIndexOf('@') + 1);
      const isDomainAllowed = allowedDomains.includes(domain);
      return isDomainAllowed
        ? null
        : {
            emailDomain: { allowedDomains, actualDomain: domain }
          };
    }

    return null;
  };
}
