import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

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

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter o estado inicial correto', () => {
    expect(component.apiLogError).toBe('');
    expect(component.passwordInput).toBe('');
    expect(component.validationResult).toBeNull();
  });

  it('deve chamar validatePassword do serviço com a senha correta quando o botão é clicado', () => {
    const testPassword = 'Teste@123';
    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(of(true));

    const button: DebugElement = fixture.debugElement.query(By.css('.validate-btn'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(mockPasswordValidatorService.validatePassword)
      .toHaveBeenCalledOnceWith({ password: testPassword });
  });

  it('should update validationResult to true when password is valid', () => {
    const testPassword = 'Valida@123';
    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(of(true));

    component.validatePassword();
    fixture.detectChanges();

    expect(component.validationResult).toBeTrue();
    expect(component.apiLogError).toBe('');

    const resultElement: HTMLElement = fixture.debugElement.query(By.css('.validation-result')).nativeElement;
    expect(resultElement.textContent).toContain('VALID');
  });

  it('should update validationResult to false when password is invalid', () => {
    const testPassword = 'Invalida';
    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(of(false));

    component.validatePassword();
    fixture.detectChanges();

    expect(component.validationResult).toBeFalse();
    expect(component.apiLogError).toBe('');

    const resultElement: HTMLElement = fixture.debugElement.query(By.css('.validation-result')).nativeElement;
    expect(resultElement.textContent).toContain('INVALID');
  });

  it('should handle service errors correctly', () => {
    const testPassword = 'Erro@123';
    const errorMessage = 'Validation error';

    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(throwError(() => new Error(errorMessage)));

    spyOn(console, 'error');

    component.validatePassword();
    fixture.detectChanges();

    expect(component.validationResult).toBeNull();
    expect(component.apiLogError).toBe(errorMessage);
    expect(console.error).toHaveBeenCalledWith(jasmine.any(Error));

    const errorElement: HTMLElement = fixture.debugElement.query(By.css('.api-error')).nativeElement;
    expect(errorElement.textContent).toContain(errorMessage);
  });

  it('Should reset the results before validating the password', () => {
    component.validationResult = true;
    component.apiLogError = 'Previous error';

    const testPassword = 'mockValue';
    component.passwordInput = testPassword;

    mockPasswordValidatorService.validatePassword.and.returnValue(of(true));

    component.validatePassword();
    fixture.detectChanges();

    expect(component.validationResult).toBeTrue();
    expect(component.apiLogError).toBe('');
  });
});
