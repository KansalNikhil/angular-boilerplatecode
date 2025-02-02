import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {ApiResponse} from './models/api-response.js';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // if using token auth
    });
  }

  get<T>(endpoint: string, params?: any): Observable<ApiResponse<T>> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      params: httpParams
    });
  }

  post<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

  // put<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
  //   return this.http.put<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body, {
  //     headers: this.getHeaders()
  //   });
  // }

  // delete<T>(endpoint: string): Observable<ApiResponse<T>> {
  //   return this.http.delete<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, {
  //     headers: this.getHeaders()
  //   });
  // }

}
