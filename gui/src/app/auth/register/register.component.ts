import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegisterModel} from './register-model';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerModel: RegisterModel;
  message: any;
  success: boolean;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    if (authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  ngOnInit(): void {
  }
  onSubmit(event: Event): any {
    event.preventDefault();
    this.registerModel = new RegisterModel(
      this.registerForm.get('username').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.registerForm.get('confirmPassword').value,
    );


    if (this.isValidRegister()){
      this.authService.register(this.registerModel).subscribe(res => {
        this.success = res.success;
        this.message = res.message;
        if (this.success) {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        }
      });
    }
  }

    isValidRegister(): boolean {
    if (this.registerModel.username.length <= 3) {
      this.success = false;
      this.message = 'Username is too short';
      return false;
    } else if (this.registerModel.email.indexOf('@') === -1 && this.registerModel.email.length <= 3){
      this.success = false;
      this.message = 'Email is not valid.';
      return false;
    } else if (this.registerModel.password.length <= 4) {
      this.success = false;
      this.message = 'Password is too short';
      return false;
    }else if (this.registerModel.password !== this.registerModel.confirmPassword) {
      this.success = false;
      this.message = 'Passwords do not match';
      return false;
    } else {
      return true;
    }
  }
}
