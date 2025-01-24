import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1'; // Updated API URL for Escuela API
  private tokenKey = 'authToken';
  private userRoleKey = 'userRole';

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.setToken(response.access_token);
          this.setUserRole(response.user?.role || 'user');
        }
      })
    );
  }

  register(data: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setUserRole(role: string): void {
    localStorage.setItem(this.userRoleKey, role);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userRoleKey);
  }
}