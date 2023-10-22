import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

import { User } from '../../interfaces/users/user.interface';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { AnnualCategory } from '../../interfaces/annualCategory/annualCategory.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiAnnualCategoriesService {

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

  getAnnualCategories(): Observable<HttpResponse<AnnualCategory[]>> {
    return this.http.get<AnnualCategory[]>(`${this.apiUrl.apiUrl}/annual-categories/${this.internalUser.id}`, { observe: 'response' }
    );
  }

  getAnnualCategory(id: string): Observable<HttpResponse<AnnualCategory>> {
    return this.http.get<AnnualCategory>(`${this.apiUrl.apiUrl}/annual-categories/${this.internalUser.id}/${id}`, { observe: 'response' });
  }

  postAnnualCategory(body: AnnualCategory): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/annual-categories/${this.internalUser.id}`, body, { observe: 'response' });
  }

  patchAnnualCategory(id: string, body: Object): Observable<HttpResponse<Object>> {
    return this.http.patch<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/annual-categories/${this.internalUser.id}/${id}`, body, { observe: 'response' });
  }

  deleteAnnualCategory(id: string): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/annual-categories/${this.internalUser.id}/${id}`, { observe: 'response' });
  }
}
