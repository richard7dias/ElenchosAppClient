import { User } from '../../interfaces/user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { InternalUserService } from '../../../shared/internal-values/internal-user/internal-user.service';
import { Currency } from '../../interfaces/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiCurrencyService {

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

  getCurrencies(): Observable<HttpResponse<Currency[]>> {
    return this.http.get<Currency[]>(`${this.apiUrl.apiUrl}/currency/${this.internalUser.id}`, { observe: 'response' }
    );
  }

  getCurrency(id: string): Observable<HttpResponse<Currency>> {
    return this.http.get<Currency>(`${this.apiUrl.apiUrl}/currency/${this.internalUser.id}/${id}`, { observe: 'response' });
  }

  postCurrency(body: Currency): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/currency/${this.internalUser.id}`, body, { observe: 'response' });
  }

  patchCurrency(id: string, body: Object): Observable<HttpResponse<Object>> {
    return this.http.patch<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/currency/${this.internalUser.id}/${id}`, body, { observe: 'response' });
  }

  deleteCurrency(id: string): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/currency/${this.internalUser.id}/${id}`, { observe: 'response' });
  }
}
