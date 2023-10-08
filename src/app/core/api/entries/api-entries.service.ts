import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { User } from '../../interfaces/users/user.interface';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { Observable } from 'rxjs';
import { Entry } from '../../interfaces/entries/entry.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiEntriesService {

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
    });
  }

  getEntries(): Observable<HttpResponse<Entry[]>> {
    return this.http.get<Entry[]>(`${this.apiUrl.apiUrl}/entries/${this.internalUser.id}`, { observe: 'response' }
    );
  }

  getEntry(id: string): Observable<HttpResponse<Entry>> {
    return this.http.get<Entry>(`${this.apiUrl.apiUrl}/entries/${this.internalUser.id}/${id}`, { observe: 'response' });
  }

  postEntry(body: Entry): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/entries/${this.internalUser.id}`, body, { observe: 'response' });
  }

  patchEntry(id: string, body: Object): Observable<HttpResponse<Object>> {
    return this.http.patch<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/entries/${this.internalUser.id}/${id}`, body, { observe: 'response' });
  }

  deleteEntry(id: string): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/entries/${this.internalUser.id}/${id}`, { observe: 'response' });
  }

  getTotalValueEntries(): Observable<HttpResponse<Object>> {
    return this.http.get<Object>(`${this.apiUrl.apiUrl}/entries-totalValue/${this.internalUser.id}`, { observe: 'response' }
    );
  }
}
