import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { OAuth } from '../interfaces/token.interface';
import { authConfig } from '../configs/auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private credential: OAuth | null = null;

  constructor(private http: HttpClient) {}

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

  getAccessToken(): string | null {
    if (this.credential) {
      return this.credential.access_token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.credential;
  }
}
