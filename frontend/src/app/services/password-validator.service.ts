import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { ApiDeployType } from '../interfaces/api-deploy.type';
import { PasswordValidateRequest } from '../interfaces/password-validate-request';

/**
 * Service that provides functionality to validate passwords by making HTTP requests to a backend API.
 */
@Injectable({ providedIn: 'root' })
export class PasswordValidatorService {
  private readonly httpClient = inject(HttpClient);

  /**
   * Sends a password validation request to the backend API.
   *
   * @param password The request payload containing the password to be validated, of type {@link PasswordValidateRequest}.
   * @param apiDeployType The type of API deployment to use ('LoadBalancer' by default), which selects the appropriate API URL from the environment.
   * @returns An {@link Observable} that emits a boolean indicating whether the password is valid.
   */
  public validatePassword(
    password: PasswordValidateRequest,
    apiDeployType: ApiDeployType = 'LoadBalancer'): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const api: string = environment.apiUrl[apiDeployType];
    const url = `${api}/password/validate`
    const body = password;

    return this.httpClient.post<boolean>(url, body, { headers });
  }
}
