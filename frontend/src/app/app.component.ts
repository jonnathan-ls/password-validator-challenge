import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordValidatorComponent } from './password-validator/password-validator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordValidatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
