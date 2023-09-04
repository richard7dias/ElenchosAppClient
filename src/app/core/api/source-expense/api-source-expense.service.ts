import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiSourceExpenseService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiService
  ) { }

  getSourceExpenses() {
    return this.http.get(`${this.apiUrl.apiUrl}/source-expense`);
  }

  getSourceExpense(description: string) {
    return this.http.get(`${this.apiUrl.apiUrl}/source-expense/${description}`);
  }

  postSourceExpense(body: any[]) {
    this.http.post(`${this.apiUrl.apiUrl}/source-expense`, body);
  }

  patchSourceExpense(description: string, body: any[]) {
    this.http.patch(`${this.apiUrl.apiUrl}/source-expense/${description}`, body);
  }

  deleteSourceExpense(description: string) {
    this.http.delete(`${this.apiUrl.apiUrl}/source-expense/${description}`);
  }
}
