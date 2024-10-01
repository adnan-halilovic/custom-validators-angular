import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import MinimumAgeValidator from '../shared/validators/age-validator.validator';
import CreditCardValidator from '../shared/validators/credit-card-validator.validator';
import DateRangeValidator from '../shared/validators/date-range-validator.validator';
import FileSizeValidator from '../shared/validators/file-size-validator.validator';
import PasswordValidator from '../shared/validators/password-validator.validator';
import PhoneValidator from '../shared/validators/phone-validator.validator';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm: FormGroup;
  today = new Date();
  twoWeeks = 86400000 * 14;
  endDateMax = new Date(this.today.getTime() + this.twoWeeks);

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', [Validators.required, MinimumAgeValidator(20)]],
      startingDate: [
        '',
        [Validators.required, DateRangeValidator(this.today, this.endDateMax)]
      ],
      idCard: [null, [Validators.required, FileSizeValidator(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, PhoneValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          PasswordValidator.passwordStrength
        ]
      ],
      confirmPassword: [
        '',
        [Validators.required, PasswordValidator.matchPassword]
      ],
      creditCard: ['', [Validators.required, CreditCardValidator]]
    });
  }

  onFileChange(event: any){
    const file = event.target.files[0];

    if(file){
      this.userForm.patchValue({
        idCard: file
      })
      
      this.userForm.get('idCard')?.markAsTouched();
    }
  }
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
    } else {
      console.log('Form Invalid');
    }
  }
}
