import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  user = 'User'; // Example user, replace with dynamic user data
  balance = 10000; // Example balance
  recentTransactions = [
    { description: 'Grocery Shopping', amount: -50, date: '2025-01-20' },
    { description: 'Salary Credit', amount: 2000, date: '2025-01-15' },
    { description: 'Electricity Bill', amount: -100, date: '2025-01-12' },
  ];
}
