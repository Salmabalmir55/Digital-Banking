import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';

export interface LoginRequest { username: string; password: string; }
export interface LoginResponse { accessToken: string; username: string; roles: string; }
export interface UserProfile { username: string; roles: string[]; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8086';
  private TOKEN_KEY = 'jwt-token';
  private USER_KEY = 'authUser';

  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken: any;

  constructor(private http: HttpClient) {
    this.loadJwtTokenFromLocalStorage();
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('username', request.username)
      .set('password', request.password);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body.toString(), { headers }).pipe(
      tap((res) => {
        const token = (res as any)['access-token'] || res.accessToken;
        if (token) {
          this.accessToken = token;
          this.isAuthenticated = true;
          this.username = request.username;
          this.roles = ['USER'];

          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.USER_KEY, JSON.stringify({
            username: request.username,
            roles: ['USER']
          }));
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.accessToken = null;
    this.username = null;
    this.roles = null;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      this.logout();
      return false;
    }
  }

  getProfile(): UserProfile | null {
    const raw = localStorage.getItem(this.USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  hasRole(role: string): boolean {
    return this.getProfile()?.roles?.includes(role) ?? false;
  }

  loadJwtTokenFromLocalStorage() {
    const token = this.getToken();
    if (token) {
      this.accessToken = token;
      this.isAuthenticated = true;
      const profile = this.getProfile();
      if (profile) {
        this.username = profile.username;
        this.roles = profile.roles;
      }
    }
  }
}
