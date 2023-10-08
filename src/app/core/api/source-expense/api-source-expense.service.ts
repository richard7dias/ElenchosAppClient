import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../../interfaces/users/user.interface';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { Observable } from 'rxjs';
import { SourceExpense } from '../../interfaces/sourceExpenses/sourceExpense.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiSourceExpenseService {

  private internalUser!: User;

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

  getSourceExpenses(): Observable<HttpResponse<SourceExpense[]>> {
    return this.http.get<SourceExpense[]>(`${this.apiUrl.apiUrl}/source-expenses/${this.internalUser.id}`, { observe: 'response' }
    );
  }

  getSourceExpense(id: string): Observable<HttpResponse<SourceExpense>> {
    return this.http.get<SourceExpense>(`${this.apiUrl.apiUrl}/source-expenses/${this.internalUser.id}/${id}`, { observe: 'response' });
  }

  postSourceExpense(body: SourceExpense): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/source-expenses/${this.internalUser.id}`, body, { observe: 'response' });
  }

  patchSourceExpense(id: string, body: Object): Observable<HttpResponse<Object>> {
    return this.http.patch<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/source-expenses/${this.internalUser.id}/${id}`, body, { observe: 'response' });
  }

  deleteSourceExpense(id: string): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/source-expenses/${this.internalUser.id}/${id}`, { observe: 'response' });
  }
}
