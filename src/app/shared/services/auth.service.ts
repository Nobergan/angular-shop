import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserInterface } from '../types/auth-user.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(user: AuthUserInterface): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        user
      )
      .pipe(
        tap((res) => {
          this.setToken(res);
          this.isAuthenticated.next(true);
        })
      );
  }

  setToken(res: AuthResponseInterface) {
    if (res) {
      const expireData = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('firebase-token-expire', expireData.toString());
      localStorage.setItem('firebase-token', res.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expireData = localStorage.getItem('firebase-token-expire');

    if (new Date().toString() > expireData) {
      this.logout();
      return null;
    }

    return localStorage.getItem('firebase-token');
  }

  initAuthentication() {
    if (this.token) {
      this.isAuthenticated.next(true);
    }
    /* ЗАМІСТЬ authGuard */

    // else {
    //   this.logout();
    //   this.router.navigate(['/admin', 'login']);
    // }

    /* ЗАМІСТЬ authGuard */
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  logout() {
    this.setToken(null);
    this.isAuthenticated.next(false);
  }
}
