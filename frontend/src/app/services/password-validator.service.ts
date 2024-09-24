import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { ApiDeployType } from '../interfaces/api-deploy.type';
import { PasswordValidateRequest } from '../interfaces/password-validate-request';

@Injectable({ providedIn: 'root' })
export class PasswordValidatorService {
  private readonly httpClient = inject(HttpClient);

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
