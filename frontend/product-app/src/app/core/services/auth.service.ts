import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', 'dummy-token');
      return of(true);
    }
    return of(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
