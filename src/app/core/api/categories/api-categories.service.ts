import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiService
  ) { }

  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getCategory(name: string) {
    return this.http.get(`${this.apiUrl}/categories/${name}`);
  }

  postCategory(body: any[]) {
    this.http.post(`${this.apiUrl}/categories`, body);
  }

  patchCategory(name: string, body: any[]) {
    this.http.patch(`${this.apiUrl}/categories/${name}`, body);
  }

  deleteCategory(name: string) {
    this.http.delete(`${this.apiUrl}/categories/${name}`);
  }
}
