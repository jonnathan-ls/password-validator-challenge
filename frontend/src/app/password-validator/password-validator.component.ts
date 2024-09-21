import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PasswordValidatorService } from '../password-validator.service';
import { CommonModule } from '@angular/common';
import { PasswordValidateRequest } from '../interfaces/password-validate-request';

@Component({
  standalone: true,
  selector: 'app-password-validator',
  imports: [CommonModule, FormsModule],
  styleUrl: './password-validator.component.scss',
  templateUrl: './password-validator.component.html'
})
export class PasswordValidatorComponent {
  public apiLogError = '';
  public passwordInput: string = '';
  public validationResult: boolean | null = null;

  private readonly passwordValidatorService = inject(PasswordValidatorService);

  public validatePassword(): void {
    const pwdToValidate: PasswordValidateRequest = { 
      password: this.passwordInput
    };
    this.passwordValidatorService
      .validatePassword(pwdToValidate)
      .subscribe({
        next: (result: boolean) => {
          this.validationResult = result;
          this.apiLogError = '';
        },
        error: (err: Error) => {
          this.apiLogError = err.message
          console.error(err);
        },
      });
  }
}
