import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthenticatorService } from '../../authenticator/authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class ApiBalancesService {

  idOwner: string = "93dd577d-7ae1-4670-8b20-ac4782a330a1";

  constructor(
    private http: HttpClient,
    private apiUrl: ApiService,
    private internalUser: AuthenticatorService
  ) { }

  getBalances() {
    console.log(this.apiUrl.apiUrl);
    return this.http.get(`${this.apiUrl.apiUrl}/balances/${this.idOwner}`);
  }

  getBalance(account: string) {
    return this.http.get(`${this.apiUrl.apiUrl}/balances/${account}`);
  }

  postBalance(body: any[]) {
    this.http.post(`${this.apiUrl.apiUrl}/balances`, body);
  }

  patchBalance(account: string, body: any[]) {
    this.http.patch(`${this.apiUrl.apiUrl}/balances/${account}`, body);
  }

  deleteBalance(account: string) {
    this.http.delete(`${this.apiUrl.apiUrl}/balances/${account}`);
  }
}
