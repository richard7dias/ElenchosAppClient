import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { User } from '../../interfaces/users/user.interface';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { Observable } from 'rxjs';
import { Launch } from '../../interfaces/launches/launch.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiLaunchesService {

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

  getLaunches(): Observable<HttpResponse<Launch[]>> {
    return this.http.get<Launch[]>(`${this.apiUrl.apiUrl}/launches/${this.internalUser.id}`, { observe: 'response' }
    );
  }

  getLaunch(id: string): Observable<HttpResponse<Launch>> {
    return this.http.get<Launch>(`${this.apiUrl.apiUrl}/launches/${this.internalUser.id}/${id}`, { observe: 'response' });
  }

  postLaunch(body: Launch): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/launches/${this.internalUser.id}`, body, { observe: 'response' });
  }

  patchLaunch(id: string, body: Object): Observable<HttpResponse<Object>> {
    return this.http.patch<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/launches/${this.internalUser.id}/${id}`, body, { observe: 'response' });
  }

  deleteLaunch(id: string): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(`${this.apiUrl.apiUrl}/launches/${this.internalUser.id}/${id}`, { observe: 'response' });
  }
}
