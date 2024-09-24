import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';

import { AuthService } from './services/auth.service';
import { PasswordValidatorComponent } from './password-validator/password-validator.component';


/**
 * Root component of the Password Validator application. Handles authentication and displays 
 * the status of authentication alongside the password validator.
 */
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [PasswordValidatorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  title = 'Password Validator';
  public isAuthenticated = false;
  public authenticationLog = '';

  private readonly authService = inject(AuthService);

  /**
   * Triggers the authentication process via the `AuthService`. 
   * Updates the `isAuthenticated` flag and logs success or failure messages.
   */
  public authenticate(): void {
    this.authService.authenticate().subscribe({
      next: () => {
        this.isAuthenticated = true;
        this.authenticationLog = '🟢 Authentication completed successfully';
      },
      error: (err: Error) => {
        this.isAuthenticated = false;
        this.authenticationLog = `🔴 Authentication failed: ${err.message}`;
      },
    });
  }
}
