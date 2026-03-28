import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'https://localhost:5000/api/Transactions';

  constructor(private http: HttpClient) {}

  // ✅ GET ALL
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  // ✅ FILTER
  getByDate(date: string): Observable<Transaction[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<Transaction[]>(`${this.apiUrl}/filter`, { params });
  }

  // 🔥 ADD THIS (VERY IMPORTANT)
  addTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(this.apiUrl, transaction);
  }
}