import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

import { AuthService } from './auth.service';
import { PasswordValidatorComponent } from './password-validator/password-validator.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, PasswordValidatorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  public isAuthenticated = false;
  public authenticationLog = '';

  private readonly authService = inject(AuthService);

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
