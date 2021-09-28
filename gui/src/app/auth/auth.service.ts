import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterModel} from './register/register-model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoginModel} from './login/login-model';
import {LocalStorageService} from 'ngx-webstorage';
import {map, retry} from 'rxjs/operators';
import {AuthResponseModel} from "./auth-response-model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              public localStorage: LocalStorageService) { }
  register(registerModel: RegisterModel): Observable<any> {
    return this.http.post(`${environment.url}/auth/signup`, registerModel);
  }
  login(loginModel: LoginModel): Observable<any> {
    return this.http.post<AuthResponseModel>(`${environment.url}/auth/login`, loginModel).pipe(map(data => {
      if (data.success) {
        this.localStorage.store('authToken', data.authToken);
        this.localStorage.store('username', data.username);
      }
      return data;
    }));
  }
  logout(): boolean {
   this.localStorage.clear();
   return true;
  }
  isAuthenticated(): boolean{
    return this.localStorage.retrieve('username') != null && this.localStorage.retrieve('authToken') != null;
  }
}
