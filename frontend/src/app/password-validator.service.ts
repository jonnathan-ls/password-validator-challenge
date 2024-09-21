import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { Observable, of } from 'rxjs';
import { urlConfig } from './configs/url.config';
import { PasswordValidateRequest } from './interfaces/password-validate-request';

@Injectable({ providedIn: 'root' })
export class PasswordValidatorService {
  private readonly httpClient = inject(HttpClient);

  public validatePassword(password: PasswordValidateRequest): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = urlConfig.api.passwordValidate;
    const body = password;

    return this.httpClient.post<boolean>(url, body, { headers });
  }
}
