import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiDeployType } from '../interfaces/api-deploy.type';
import { PasswordValidatorService } from '../services/password-validator.service';
import { PasswordValidateRequest } from '../interfaces/password-validate-request';

/**
 * Component responsible for validating passwords by interacting with the backend API.
 * It allows the user to input a password and displays the validation result.
 */
@Component({
  standalone: true,
  selector: 'app-password-validator',
  imports: [CommonModule, FormsModule],
  styleUrl: './password-validator.component.scss',
  templateUrl: './password-validator.component.html'
})
export class PasswordValidatorComponent {
  public apiRequestLog = '';
  public apiEndpointType: ApiDeployType = 'LoadBalancer';

  public passwordInput: string = '';
  public validationResult: boolean | null = null;

  private readonly passwordValidatorService = inject(PasswordValidatorService);

   /**
   * Validates the input password by sending a request to the backend API. Displays the result or error message.
   * Shows a loading indicator while the request is being processed.
   */
  public validatePassword(): void {
    this.resetResultsOfComponent();
    const loading = setInterval(() => {
      if (this.apiRequestLog.length > 10) this.apiRequestLog = '';
      else this.apiRequestLog += '🟧';
    }, 200);
    const pwdToValidate: PasswordValidateRequest = { 
      password: this.passwordInput
    };
    this.passwordValidatorService
      .validatePassword(pwdToValidate, this.apiEndpointType)
      .subscribe({
        next: (result: boolean) => {
          this.apiRequestLog = '';
          clearInterval(loading);
          this.validationResult = result;
        },
        error: (err: Error) => {
          this.apiRequestLog = err.message;
          this.validationResult = null;
          clearInterval(loading);
          console.error(err);
        },
      });
  }

  /**
   * Resets the component's result variables (`validationResult` and `apiRequestLog`)
   * to prepare for a new validation attempt.
   */
  public resetResultsOfComponent(){
    this.validationResult = null;
    this.apiRequestLog = '';
  }
}
