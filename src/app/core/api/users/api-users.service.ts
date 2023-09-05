import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiService
  ) { }

  getUserLogin(email: string, password: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.apiUrl.apiUrl}/users/${email}/${password}`, { observe: 'response' }
    );
  }

  getUser(id: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.apiUrl.apiUrl}/users/${id}`, { observe: 'response' });
  }

  postUser(newUser: User): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/users`, newUser, { observe: 'response' });
  }

  patchUser(id: string, body: Object): Observable<HttpResponse<Object>> {
    return this.http.patch<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/users/${id}`, body, { observe: 'response' });
  }

  deleteUser(id: string): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/users/${id}`, { observe: 'response' });
  }
}
