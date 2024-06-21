import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/auth/register`, user, { withCredentials: true });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/auth/login`, credentials, { withCredentials: true });
  }

  logout(): void {
    this.http.post(`${this.apiServerUrl}/auth/logout`, {}, { withCredentials: true }).subscribe(
      response => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
  
}
