import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { InternalUserService } from '../../../shared/internal-values/internal-user/internal-user.service';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Balance } from '../../interfaces/balance.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiBalancesService {

  internalUser!: User;

  constructor(
    private http: HttpClient,
    private apiUrl: ApiService,
    private user: InternalUserService
  ) {
    this.user.getInternalUser().subscribe(user => {
      if (user) {
        this.internalUser = user;
      }
    })
  }

  getBalances(): Observable<HttpResponse<Balance[]>> {
    return this.http.get<Balance[]>(`${this.apiUrl.apiUrl}/balance/${this.internalUser.id}`, { observe: 'response' }
    );
  }

  getBalance(id: string): Observable<HttpResponse<Balance>> {
    return this.http.get<Balance>(`${this.apiUrl.apiUrl}/balance/${this.internalUser.id}/${id}`, { observe: 'response' });
  }

  postBalance(body: Balance): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/balance/${this.internalUser.id}`, body, { observe: 'response' });
  }

  patchBalance(id: string, body: Object): Observable<HttpResponse<Object>> {
    return this.http.patch<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/balance/${this.internalUser.id}/${id}`, body, { observe: 'response' });
  }

  deleteBalance(id: string): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/balance/${this.internalUser.id}/${id}`, { observe: 'response' });
  }
}
