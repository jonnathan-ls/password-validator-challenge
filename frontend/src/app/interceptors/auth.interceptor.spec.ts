import { TestBed } from '@angular/core/testing';
import { Injector, runInInjectionContext } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpHandlerFn } from '@angular/common/http';

import { of } from 'rxjs';

import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let injector: Injector;
  let authService: jasmine.SpyObj<AuthService>;
  let httpHandler: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getAccessToken']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });

    httpHandler = httpHandlerSpy;
    injector = TestBed.inject(Injector);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should add Authorization header when access token is present', (done: DoneFn) => {
    const mockToken = 'mocked-access-token';
    authService.getAccessToken.and.returnValue(mockToken);

    const mockHeaders = new HttpHeaders();
    const mockRequest = new HttpRequest('GET', '/test', { headers: mockHeaders });

    const expectedHeaders = mockHeaders.append('Authorization', `Bearer ${mockToken}`);
    const expectedRequest = mockRequest.clone({ headers: expectedHeaders });

    runInInjectionContext(injector, () => {
      execExpectedAuthInterceptor(expectedRequest, mockRequest, httpHandler.handle, done);
    });
  });

  it('should not add Authorization header when access token is not present', (done: DoneFn) => {
    authService.getAccessToken.and.returnValue(null);

    const mockHeaders = new HttpHeaders({ 'MockHeader': 'Value' });
    const mockRequest = new HttpRequest('GET', '/test', { headers: mockHeaders });

    runInInjectionContext(injector, () => {
      execExpectedAuthInterceptor(mockRequest, mockRequest, httpHandler.handle, done);
    });
  });

  function execExpectedAuthInterceptor(
    expectedRequest: HttpRequest<unknown>,
    request: HttpRequest<unknown>, 
    httpHandle: HttpHandlerFn, 
    doneFn: DoneFn) {
    httpHandler.handle.and.returnValue(of({} as HttpEvent<unknown>));
    authInterceptor(request, httpHandle).subscribe({
      next: () => {
        expect(authService.getAccessToken).toHaveBeenCalled();
        expect(httpHandler.handle).toHaveBeenCalledWith(expectedRequest);
        doneFn();
      },
      error: doneFn.fail
    });
  }
});


