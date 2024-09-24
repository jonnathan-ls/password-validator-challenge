import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PasswordValidatorService } from '../services/password-validator.service';
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
    this.resetResultsOfComponent();
    const pwdToValidate: PasswordValidateRequest = { 
      password: this.passwordInput
    };
    this.passwordValidatorService
      .validatePassword(pwdToValidate)
      .subscribe({
        next: (result: boolean) => {
          this.validationResult = result;
        },
        error: (err: Error) => {
          this.apiLogError = err.message;
          this.validationResult = null;
          console.error(err);
        },
      });
  }

  public resetResultsOfComponent(){
    this.validationResult = null;
    this.apiLogError = '';
  }
}
