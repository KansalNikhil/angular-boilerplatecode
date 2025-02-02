import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { LoginRequest, AuthResponse, UserData } from './models/auth-model';
import { LOGIN_URL } from '../utils/constanturls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'auth_data';
  private readonly apiUrl = environment.apiUrl;

  private authSubject = new BehaviorSubject<AuthResponse | null>(null);
  public auth$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {
    // this.loadAuthData();
  }

  // private loadAuthData(): void {
  //   const storedAuth = localStorage.getItem(this.AUTH_KEY);
  //   if (storedAuth) {
  //     this.authSubject.next(JSON.parse(storedAuth));
  //   }
  // }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${LOGIN_URL}`, credentials)
      .pipe(
        tap(response => this.setAuthData(response))
      );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.authSubject.next(null);
  }

  private setAuthData(authData: AuthResponse): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
    this.authSubject.next(authData);
  }

  getToken(): string | null {
    return this.authSubject.value?.token || null;
  }

  getUserData(): UserData | null {
    return this.authSubject.value?.userData || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  updateUserData(userData: Partial<UserData>): void {
    const currentAuth = this.authSubject.value;
    if (currentAuth) {
      const updatedAuth = {
        ...currentAuth,
        userData: { ...currentAuth.userData, ...userData }
      };
      this.setAuthData(updatedAuth);
    }
  }
}
