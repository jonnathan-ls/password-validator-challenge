import { TestBed } from '@angular/core/testing';

import { PasswordValidatorService } from './password-validator.service';
import { provideHttpClient } from '@angular/common/http';

describe('PasswordValidatorService', () => {
  let service: PasswordValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideHttpClient() ],
    });
    service = TestBed.inject(PasswordValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
