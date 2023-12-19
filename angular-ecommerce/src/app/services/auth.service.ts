import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject(this.isLoggedIn());

  constructor(private httpClient: HttpClient) {}

  generateToken(credentials: any) {
    return this.httpClient.post(`${environment.authUrl}/login`, credentials);
  }

  logIn(token: string, email: string, fullName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('fullName', fullName);
    this.loggedIn.next(true);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    }

    return true;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('fullName');
    this.loggedIn.next(false);
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signup(credentials: any) {
    return this.httpClient.post(`${environment.authUrl}/signup`, credentials);
  }

  getEmail() {
    return localStorage.getItem('userEmail');
  }

  getFullName() {
    return localStorage.getItem('fullName');
  }
}
