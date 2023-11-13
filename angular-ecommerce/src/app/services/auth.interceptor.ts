import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request;
    let token = this.authService.getToken();
    // debugger
    console.log('Intercepting req with token,', token);

    if(token != null) {
      // newRequest = newRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}});
      newRequest = newRequest.clone({
        headers: newRequest.headers.set('Authorization', `Bearer ${token}`)
      });
      // debugger
      console.log(newRequest.headers.get('Authorization'));
    }
    // debugger
    console.log('newReq', newRequest);
    return next.handle(newRequest);
  }
}
