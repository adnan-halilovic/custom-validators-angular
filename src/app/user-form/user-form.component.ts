import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import CreditCardValidator from '../shared/validators/credit-card-validator.validator';
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

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
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
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
    } else {
      console.log('Form Invalid');
    }
  }
}
