import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiLaunchesService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiService
  ) { }

  getLaunches() {
    return this.http.get(`${this.apiUrl}/launches`);
  }

  getLaunch(id: string) {
    return this.http.get(`${this.apiUrl}/launches/${id}`);
  }

  postLaunch(body: any[]) {
    this.http.post(`${this.apiUrl}/launches`, body);
  }

  patchLaunch(id: string, body: any[]) {
    this.http.patch(`${this.apiUrl}/launches/${id}`, body);
  }

  deleteLaunch(id: string) {
    this.http.delete(`${this.apiUrl}/launches/${id}`);
  }
}
