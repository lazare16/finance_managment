import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'registeredUsers';
  private tokenKey = 'authToken';
  private userRoleKey = 'userRole';

  constructor() {}

  // Mock login method
  login(credentials: { email: string; password: string }): boolean {
    const users = this.getRegisteredUsers();
    const user = users.find(
      (u: any) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      this.setToken('mock-token'); // Simulate token generation
      this.setUserRole(user.role || 'user'); // Default role is 'user'
      return true;
    }

    return false;
  }

  // Mock registration method
  register(data: { email: string; password: string; name: string }): boolean {
    const users = this.getRegisteredUsers();

    // Check if the email already exists
    if (users.some((u: any) => u.email === data.email)) {
      return false; // Email already registered
    }

    // Add new user
    users.push({
      email: data.email,
      password: data.password,
      name: data.name,
      role: 'user', // Default role
    });

    this.saveRegisteredUsers(users);
    return true;
  }

  private saveRegisteredUsers(users: any[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private getRegisteredUsers(): any[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
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
