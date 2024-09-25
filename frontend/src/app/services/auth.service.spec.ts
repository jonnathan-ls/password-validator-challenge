import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OAuth } from '../interfaces/token.interface';
import { authConfig } from '../configs/auth.config';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockAuthConfig = {
    clientId: 'test-client-id',
    grant_type: 'client_credentials',
    clientSecret: 'test-client-secret',
    resourceServerUrl: 'https://api.example.com/oauth/token'
  };

  const mockOAuthResponse: OAuth = {
    expires_in: 3600,
    token_type: 'Bearer',
    access_token: 'mock-access-token',
  };

  beforeEach(() => {
    (authConfig as any).clientId = mockAuthConfig.clientId;
    (authConfig as any).grant_type = mockAuthConfig.grant_type;
    (authConfig as any).clientSecret = mockAuthConfig.clientSecret;
    (authConfig as any).resourceServerUrl = mockAuthConfig.resourceServerUrl;

    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { httpMock.verify() });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authenticate', () => {
    it('should perform a POST request with correct parameters and store credentials', () => {
      service.authenticate().subscribe(response => {
        expect(response).toEqual(mockOAuthResponse);
        expect(service.getAccessToken()).toBe(mockOAuthResponse.access_token);
        expect(service.isAuthenticated()).toBeTrue();
      });

      const req = httpMock.expectOne(mockAuthConfig.resourceServerUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');

      const expectedBody = new URLSearchParams();
      expectedBody.set('grant_type', mockAuthConfig.grant_type);
      expectedBody.set('client_id', mockAuthConfig.clientId);
      expectedBody.set('client_secret', mockAuthConfig.clientSecret);

      expect(req.request.body).toBe(expectedBody.toString());

      req.flush(mockOAuthResponse);
    });

    it('should handle errors and not store credentials', () => {
      const mockError = { status: 400, statusText: 'Bad Request' };

      service.authenticate().subscribe({
        next: () => {
          fail('Expected error, but the request was successful');
        },
        error: (error) => {
          expect(error.status).toBe(400);
          expect(service.getAccessToken()).toBeNull();
          expect(service.isAuthenticated()).toBeFalse();
        }
      });

      const req = httpMock.expectOne(mockAuthConfig.resourceServerUrl);
      expect(req.request.method).toBe('POST');

      req.flush('Authentication error', mockError);
    });
  });

  describe('getAccessToken', () => {
    it('should return the access token when authenticated', () => {
      (service as any).credential = mockOAuthResponse;

      const token = service.getAccessToken();
      expect(token).toBe(mockOAuthResponse.access_token);
    });

    it('should return null when not authenticated', () => {
      (service as any).credential = null;

      const token = service.getAccessToken();
      expect(token).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when authenticated', () => {
      (service as any).credential = mockOAuthResponse;

      const isAuth = service.isAuthenticated();
      expect(isAuth).toBeTrue();
    });

    it('should return false when not authenticated', () => {
      (service as any).credential = null;

      const isAuth = service.isAuthenticated();
      expect(isAuth).toBeFalse();
    });
  });
});
