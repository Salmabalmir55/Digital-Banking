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

    return this.http.post<any>(`${this.baseUrl}/auth/login`, body.toString(), { headers }).pipe(
      tap((res) => {
        const token = res['access-token'] || res.accessToken;

        if (token) {
          this.accessToken = token;
          this.isAuthenticated = true;

          try {
            const decoded: any = jwtDecode(token);
            this.username = decoded.sub;

            if (decoded.scope) {
              // Si scope est une chaîne comme "SCOPE_ADMIN SCOPE_USER"
              if (typeof decoded.scope === 'string') {
                // Nettoyer les préfixes "SCOPE_"
                let roles = decoded.scope.split(' ');
                this.roles = roles.map((role: string) => role.replace('SCOPE_', ''));
              } else {
                this.roles = decoded.scope;
              }
            } else if (decoded.roles) {
              this.roles = Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles];
            } else {
              this.roles = ['USER'];
            }

            console.log('Login réussi - Username:', this.username, 'Rôles:', this.roles);
          } catch (e) {
            console.error('Erreur décodage token:', e);
            this.username = request.username;
            this.roles = ['USER'];
          }

          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.USER_KEY, JSON.stringify({
            username: this.username,
            roles: this.roles
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
    const profile = this.getProfile();
    if (!profile || !profile.roles) return false;
    const hasRole = profile.roles.includes(role) || profile.roles.includes(`SCOPE_${role}`);
    console.log(`🔍 hasRole(${role}) = ${hasRole}`, profile.roles);
    return hasRole;
  }

  loadJwtTokenFromLocalStorage() {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          this.accessToken = token;
          this.isAuthenticated = true;

          const profile = this.getProfile();
          if (profile) {
            this.username = profile.username;
            this.roles = profile.roles;
          }
        } else {
          this.logout();
        }
      } catch(e) {
        this.logout();
      }
    }
  }
}
