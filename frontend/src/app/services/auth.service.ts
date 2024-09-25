import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { OAuth } from '../interfaces/token.interface';
import { authConfig } from '../configs/auth.config';

/**
 * Service responsible for handling authentication, 
 * including obtaining OAuth tokens and checking authentication status.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private credential: OAuth | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Authenticates the client by sending a request to the OAuth server with client credentials.
   * 
   * @returns An {@link Observable} that emits the OAuth credentials upon successful authentication.
   */
  public authenticate(): Observable<any> {
    const { grant_type, clientId, clientSecret, resourceServerUrl } = authConfig;

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('grant_type', grant_type);
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);

    return this.http.post<OAuth>(resourceServerUrl, body.toString(), { headers })
      .pipe(tap(result => this.credential = result));
  }

  /**
   * Retrieves the current access token from the stored credentials.
   *
   * @returns The access token if available, otherwise `null`.
   */
  public getAccessToken(): string | null {
    if (this.credential) {
      return this.credential.access_token;
    }
    return null;
  }

  /**
   * Checks whether the client is authenticated by verifying if credentials are available.
   *
   * @returns `true` if the client is authenticated, `false` otherwise.
   */
  public isAuthenticated(): boolean {
    return !!this.credential;
  }
}
