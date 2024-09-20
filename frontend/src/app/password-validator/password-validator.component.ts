import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PasswordValidatorService } from '../password-validator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-validator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-validator.component.html',
  styleUrl: './password-validator.component.scss'
})
export class PasswordValidatorComponent {
  password: string = '';
  validationResult: boolean | null = null;

  constructor(private readonly passwordValidatorService: PasswordValidatorService) {}

  validatePassword() {
    this.passwordValidatorService.validatePasswordFake(this.password).subscribe(
      {
        next: (result) => this.validationResult = result,
        error: (err) => alert(err),
      }
    );
  }
}
