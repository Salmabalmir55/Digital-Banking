// src/app/services/accounts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccountDTO, AccountHistoryDTO, DebitDTO, CreditDTO, TransferDTO } from '../model/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private baseUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.baseUrl}/accounts`);
  }

  getAccountHistory(accountId: string, page: number = 0, size: number = 5): Observable<AccountHistoryDTO> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<AccountHistoryDTO>(`${this.baseUrl}/accounts/${accountId}/pageOperations`, { params });
  }

  debit(dto: DebitDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/accounts/debit`, dto);
  }

  credit(dto: CreditDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/accounts/credit`, dto);
  }

  transfer(dto: TransferDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/accounts/transfer`, dto);
  }

  saveCurrentAccount(balance: number, overdraft: number, customerId: number): Observable<BankAccountDTO> {
    const params = new HttpParams()
      .set('initialBalance', balance)
      .set('overDraft', overdraft)
      .set('customerId', customerId);
    return this.http.post<BankAccountDTO>(`${this.baseUrl}/accounts/saveCurrent`, null, { params });
  }

  saveSavingAccount(balance: number, interestRate: number, customerId: number): Observable<BankAccountDTO> {
    const params = new HttpParams()
      .set('initialBalance', balance)
      .set('interestRate', interestRate)
      .set('customerId', customerId);
    return this.http.post<BankAccountDTO>(`${this.baseUrl}/accounts/saveSaving`, null, { params });
  }
}
