import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';

import { Subject, of, throwError } from 'rxjs';

import { PasswordValidatorComponent } from './password-validator.component';
import { PasswordValidatorService } from '../services/password-validator.service';

describe('PasswordValidatorComponent', () => {
  let component: PasswordValidatorComponent;
  let fixture: ComponentFixture<PasswordValidatorComponent>;
  let mockPasswordValidatorService: jasmine.SpyObj<PasswordValidatorService>;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('PasswordValidatorService', ['validatePassword']);

    TestBed.configureTestingModule({
      imports: [PasswordValidatorComponent, FormsModule],
      providers: [
        { provide: PasswordValidatorService, useValue: serviceSpy }
      ]
    }).compileComponents();

    mockPasswordValidatorService = TestBed.inject(PasswordValidatorService) as jasmine.SpyObj<PasswordValidatorService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial state', () => {
    expect(component.apiRequestLog).toBe('');
    expect(component.passwordInput).toBe('');
    expect(component.validationResult).toBeNull();
  });

  it('should call validatePassword from the service with the correct password when the button is clicked', fakeAsync(() => {
    const testPassword = 'Test@123';
    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(of(true));

    const button: DebugElement = fixture.debugElement.query(By.css('.validate-btn'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    tick();

    expect(mockPasswordValidatorService.validatePassword)
      .toHaveBeenCalledWith({ password: testPassword }, 'LoadBalancer');
  }));

  it('should update validationResult to true when password is valid', fakeAsync(() => {
    const testPassword = 'Valid@123';
    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(of(true));

    component.validatePassword();
    fixture.detectChanges();

    tick();

    expect(component.validationResult).toBeTrue();
    expect(component.apiRequestLog).toBe('');

    const resultElement: HTMLElement = fixture.debugElement.query(By.css('.validation-result')).nativeElement;
    expect(resultElement.textContent).toContain('VALID');
  }));

  it('should update validationResult to false when password is invalid', fakeAsync(() => {
    const testPassword = 'Invalid';
    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(of(false));

    component.validatePassword();
    fixture.detectChanges();

    tick();

    expect(component.validationResult).toBeFalse();
    expect(component.apiRequestLog).toBe('');

    const resultElement: HTMLElement = fixture.debugElement.query(By.css('.validation-result')).nativeElement;
    expect(resultElement.textContent).toContain('INVALID');
  }));

  it('should handle service errors correctly', fakeAsync(() => {
    const testPassword = 'Error@123';
    const errorMessage = 'Validation error';

    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(throwError(() => new Error(errorMessage)));

    spyOn(console, 'error');

    component.validatePassword();
    fixture.detectChanges();

    tick();

    expect(component.validationResult).toBeNull();
    expect(component.apiRequestLog).toBe(errorMessage);
    expect(console.error).toHaveBeenCalledWith(jasmine.any(Error));

    const errorElement: HTMLElement = fixture.debugElement.query(By.css('.api-error')).nativeElement;
    expect(errorElement.textContent).toContain(errorMessage);
  }));

  it('should reset the results before validating the password', fakeAsync(() => {
    component.validationResult = true;
    component.apiRequestLog = 'Previous error';

    const testPassword = 'mockValue';
    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(of(true));

    component.validatePassword();
    fixture.detectChanges();

    tick();

    expect(component.validationResult).toBeTrue();
    expect(component.apiRequestLog).toBe('');
  }));

  it('should update apiRequestLog with loading indicators during validation', fakeAsync(() => {
    const testPassword = 'Loading@123';
    component.passwordInput = testPassword;

    const subject = new Subject<boolean>();
    mockPasswordValidatorService.validatePassword.and.returnValue(subject.asObservable());

    component.validatePassword();
    tick(2500);
    expect(component.apiRequestLog).toContain('🟧');
    fixture.detectChanges();

    subject.next(true);
    subject.complete();
    tick();

    expect(component.validationResult).toBeTrue();
    expect(component.apiRequestLog).toBe('');
  }));

  it('should clear loading indicators after validation completes', fakeAsync(() => {
    const testPassword = 'Complete@123';
    component.passwordInput = testPassword;

    const subject = new Subject<boolean>();
    mockPasswordValidatorService.validatePassword.and.returnValue(subject.asObservable());

    component.validatePassword();
    tick(250);
    expect(component.apiRequestLog).toContain('🟧');
    fixture.detectChanges();

    subject.next(true);
    subject.complete();
    tick();

    expect(component.validationResult).toBeTrue();
    expect(component.apiRequestLog).toBe('');
  }));
});
