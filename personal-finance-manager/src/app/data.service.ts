import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://your-firefly-iii-instance.com/api/v1'; // Replace with your Firefly III API base URL
  private token = 'your-access-token'; // Replace with your API token from Firefly III

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch accounts
  getAccounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts`, { headers: this.getHeaders() });
  }

  // Fetch transactions
  getTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions`, { headers: this.getHeaders() });
  }

  // Create a new transaction
  createTransaction(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, data, { headers: this.getHeaders() });
  }

  // Fetch budgets
  getBudgets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/budgets`, { headers: this.getHeaders() });
  }

  // Create a new budget
  createBudget(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/budgets`, data, { headers: this.getHeaders() });
  }
}