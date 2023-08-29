import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getCategorias() {
    return this.http.get(`${this.apiUrl}/categorias`);
  }

}
