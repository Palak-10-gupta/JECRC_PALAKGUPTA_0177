import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-record-table',
  standalone: false,
  templateUrl: './record-table.html',
  styleUrls: ['./record-table.css']
})
export class RecordTableComponent implements OnInit {

  transactions: Transaction[] = [];
  allTransactions: Transaction[] = [];
  selectedDate: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  // 🔥 Add Transaction Model
  newTransaction: Transaction = {
    id: 0,
    date: '',
    description: '',
    type: 0,
    amount: 0,
    balance: ''
  };

  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllTransactions();
  }

  // ✅ LOAD ALL DATA
  loadAllTransactions(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.allTransactions = data;
        this.transactions = data;

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Could not load data';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ✅ DATE CHANGE
  onDateChange(value: string): void {
    this.selectedDate = value;
  }

  // ✅ FILTER
  onFilter(): void {
    if (!this.selectedDate) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.transactionService.getByDate(this.selectedDate).subscribe({
      next: (data) => {
        this.transactions = data;

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to filter transactions';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ✅ SORT
  sortByAmount(): void {
    this.transactions = [...this.transactions].sort((a, b) => a.amount - b.amount);
  }

  // ✅ RESET
  resetFilter(): void {
    this.selectedDate = '';
    this.transactions = [...this.allTransactions];
    this.errorMessage = '';
    this.isLoading = false;

    this.cdr.detectChanges();
  }

  // 🔥 FINAL FIXED ADD TRANSACTION
  addTransaction(): void {

    // ✅ validation
    if (
      !this.newTransaction.date ||
      !this.newTransaction.description ||
      !this.newTransaction.amount ||
      !this.newTransaction.balance
    ) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    // 🔥 FIX DATE FORMAT (VERY IMPORTANT)
    const formattedDate = new Date(this.newTransaction.date)
      .toISOString()
      .split('T')[0];

    const payload: Transaction = {
      ...this.newTransaction,
      date: formattedDate
    };

    this.transactionService.addTransaction(payload).subscribe({
      next: () => {
        // reload table
        this.loadAllTransactions();

        // reset form
        this.newTransaction = {
          id: 0,
          date: '',
          description: '',
          type: 0,
          amount: 0,
          balance: ''
        };

        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err); // 👈 DEBUG
        this.errorMessage = 'Failed to add transaction';
        this.cdr.detectChanges();
      }
    });
  }
}