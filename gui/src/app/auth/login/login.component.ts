import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {LoginModel} from './login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loginModel: LoginModel;
  message: any;
  success: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    if (authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.loginModel = new LoginModel(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value);
    if (this.isValidLogin()) {
      this.authService.login(this.loginModel).subscribe(res => {
        this.success = res.success;
        if (this.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.message = res.message;
        }
      });
    }
  }

  private isValidLogin(): boolean {
    if (this.loginModel.username.length === 0 ){
      this.message = 'Username is required';
      this.success = false;
      return false;
    }
    if (this.loginModel.password.length === 0 ){
      this.message = 'Password is required';
      this.success = false;
      return false;
    }
    return true;
  }
}
