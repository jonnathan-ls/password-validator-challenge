import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';

import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

class MockAuthService {
  authenticate() {
    return of({});
  }
}

@Component({
  selector: 'app-password-validator',
  template: '',
  standalone: true
})
class MockPasswordValidatorComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let authenticateSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CommonModule,
        MockPasswordValidatorComponent,
        HttpClientTestingModule
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    authenticateSpy = spyOn(authService, 'authenticate');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Password Validator'`, () => {
    expect(component.title).toEqual('Password Validator');
  });

  it('should have isAuthenticated as false initially', () => {
    expect(component.isAuthenticated).toBeFalse();
  });

  it('should have an empty authenticationLog initially', () => {
    expect(component.authenticationLog).toBe('');
  });

  it('should authenticate successfully', () => {
    const mockResponse = {};
    authenticateSpy.and.returnValue(of(mockResponse));

    component.authenticate();
    expect(authenticateSpy).toHaveBeenCalled();

    expect(component.isAuthenticated).toBeTrue();
    expect(component.authenticationLog).toBe('🟢 Authentication completed successfully');
  });

  it('should handle authentication failure', () => {
    const mockError = new Error('Invalid credentials');
    authenticateSpy.and.returnValue(throwError(() => mockError));

    component.authenticate();
    expect(authenticateSpy).toHaveBeenCalled();

    expect(component.isAuthenticated).toBeFalse();
    expect(component.authenticationLog).toBe(`🔴 Authentication failed: ${mockError.message}`);
  });

  it('should call the authenticate method when the button is clicked', () => {
    const buttonDe: DebugElement = fixture.debugElement.query(By.css('.authenticate-btn'));
    const authenticateMethodSpy = spyOn(component, 'authenticate');

    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(authenticateMethodSpy).toHaveBeenCalled();
  });

  it('should display the correct authenticationLog message after successful authentication', () => {
    const mockResponse = {};
    authenticateSpy.and.returnValue(of(mockResponse));

    component.authenticate();
    fixture.detectChanges();

    const logDe: DebugElement = fixture.debugElement.query(By.css('.auth-log'));
    const logEl: HTMLElement = logDe.nativeElement;

    expect(logEl.textContent).toBe('🟢 Authentication completed successfully');
  });

  it('should display the correct authenticationLog message after failed authentication', () => {
    const mockError = new Error('Network error');
    authenticateSpy.and.returnValue(throwError(() => mockError));

    component.authenticate();
    fixture.detectChanges();

    const logDe: DebugElement = fixture.debugElement.query(By.css('.auth-log'));
    const logEl: HTMLElement = logDe.nativeElement;

    expect(logEl.textContent).toBe(`🔴 Authentication failed: ${mockError.message}`);
  });
});
