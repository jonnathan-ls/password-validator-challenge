import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordValidatorComponent } from './password-validator/password-validator.component';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, PasswordValidatorComponent],
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
      next: () => this.authenticationLog = '🟢 Authentication completed successfully',
      error: (err: Error) => this.authenticationLog = `🔴 Authentication failed: ${err.message}`
    });
  }
}
