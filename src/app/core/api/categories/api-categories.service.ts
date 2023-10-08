import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';

import { User } from '../../interfaces/users/user.interface';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/categories/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesService {

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

  getCategories(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(`${this.apiUrl.apiUrl}/categories/${this.internalUser.id}`, { observe: 'response' }
    );
  }

  getCategory(id: string): Observable<HttpResponse<Category>> {
    return this.http.get<Category>(`${this.apiUrl.apiUrl}/categories/${this.internalUser.id}/${id}`, { observe: 'response' });
  }

  postCategory(body: Category): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/categories/${this.internalUser.id}`, body, { observe: 'response' });
  }

  patchCategory(id: string, body: Object): Observable<HttpResponse<Object>> {
    return this.http.patch<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/categories/${this.internalUser.id}/${id}`, body, { observe: 'response' });
  }

  deleteCategory(id: string): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/categories/${this.internalUser.id}/${id}`, { observe: 'response' });
  }
}
