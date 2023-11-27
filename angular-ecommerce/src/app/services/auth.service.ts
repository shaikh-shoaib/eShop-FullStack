import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080/auth";

  loggedIn = new BehaviorSubject(this.isLoggedIn());

  constructor(private httpClient: HttpClient) { }

  generateToken(credentials: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, credentials);
  }

  logIn(token: string, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    this.loggedIn.next(true);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if(token == undefined || token === '' || token == null) {
      return false;
    }

    return true;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.loggedIn.next(false);
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signup(credentials: any) {
    return this.httpClient.post(`${this.baseUrl}/signup`,credentials);
  }

  getEmail() {
    return localStorage.getItem('userEmail');
  }
}
