import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiBalancesService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiService
  ) { }

  getBalances() {
    return this.http.get(`${this.apiUrl}/balances`);
  }

  getBalance(account: string) {
    return this.http.get(`${this.apiUrl}/balances/${account}`);
  }

  postBalance(body: any[]) {
    this.http.post(`${this.apiUrl}/balances`, body);
  }

  patchBalance(account: string, body: any[]) {
    this.http.patch(`${this.apiUrl}/balances/${account}`, body);
  }

  deleteBalance(account: string) {
    this.http.delete(`${this.apiUrl}/balances/${account}`);
  }
}
