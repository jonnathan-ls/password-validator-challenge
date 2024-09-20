import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  private apiUrl = 'https://your-api-endpoint/api/password/validate';

  constructor(private http: HttpClient) { }

  validatePassword(password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-client-credentials-token'
    });
    return this.http.post<boolean>(this.apiUrl, password, { headers });
  }

  validatePasswordFake(password: string): Observable<boolean> {
    return of(password.length > 1);
  }
}
