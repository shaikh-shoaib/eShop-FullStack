import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  generateToken(credentials: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, credentials);
  }

  logIn(token: string) {
    localStorage.setItem('token', token);
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
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signup(credentials: any) {
    return this.httpClient.post(`${this.baseUrl}/signup`,credentials);
  }
}
