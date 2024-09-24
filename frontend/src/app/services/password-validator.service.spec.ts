import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PasswordValidatorService } from './password-validator.service';
import { PasswordValidateRequest } from '../interfaces/password-validate-request';
import { environment } from '../../environments/environment';

describe('PasswordValidatorService', () => {
  let httpMock: HttpTestingController;
  let service: PasswordValidatorService;
  
  const mockUrl = 'https://mock-api';

  beforeEach(() => {
    environment.apiUrl.LoadBalancer = mockUrl;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PasswordValidatorService]
    });

    service = TestBed.inject(PasswordValidatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('validatePassword', () => {
    it('should return true when the password is valid', () => {
      const request: PasswordValidateRequest = { password: 'Valid@123' };
      const mockResponse = true;

      service.validatePassword(request).subscribe(response => {
        expect(response).toBeTrue();
      });

      const expectedMockUrl = `${mockUrl}/password/validate`;
      const req = httpMock.expectOne(expectedMockUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.body).toEqual(request);

      req.flush(mockResponse);
    });

    it('should return false when the password is invalid', () => {
      const request: PasswordValidateRequest = { password: 'Invalid' };
      const mockResponse = false;

      service.validatePassword(request).subscribe(response => {
        expect(response).toBeFalse();
      });

      const expectedMockUrl = `${mockUrl}/password/validate`;
      const req = httpMock.expectOne(expectedMockUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.body).toEqual(request);

      req.flush(mockResponse);
    });

    it('should propagate the error when the request fails', () => {
      const request: PasswordValidateRequest = { password: 'Error@123' };
      const mockError = { status: 500, statusText: 'Internal Server Error' };

      service.validatePassword(request).subscribe({
        next: () => {
          fail('Expected an error, but the request was successful');
        },
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      });

      const expectedMockUrl = `${mockUrl}/password/validate`;
      const req = httpMock.expectOne(expectedMockUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.body).toEqual(request);

      req.flush('Internal Error', mockError);
    });
  });
});
