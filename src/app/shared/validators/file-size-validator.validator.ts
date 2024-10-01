import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function FileSizeValidator(maxSizeInMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;

    if (file) {
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      const uploadedFileSizeInMB = Math.round(file.size / (1024 * 1024));

      if (file.size > maxSizeInBytes) {
        return {
          fileSizeExeeded: {
            actualSize: `${uploadedFileSizeInMB}MB`,
            maxSize: `${maxSizeInMB}MB`
          }
        };
      }
    }
    return null;
  };
}
