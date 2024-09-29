import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export default function DateRangeValidator(
    startDate: Date,
    endDate: Date,
): ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
        const inputDate = new Date(control.value);
        const valid = inputDate >= startDate && inputDate <= endDate;
        return valid ? null : {
            dateOutOfRange : {minDate: startDate, maxDate: endDate}
        }
    }
}