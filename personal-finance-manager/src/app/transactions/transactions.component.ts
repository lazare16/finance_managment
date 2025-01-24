import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transactions: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTransactions().subscribe(
      (data) => {
        this.transactions = data.data; // Adjust based on Firefly III response structure
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
