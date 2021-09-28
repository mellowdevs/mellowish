import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private $localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.$localStorage.retrieve('authToken');
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set(
          'Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
