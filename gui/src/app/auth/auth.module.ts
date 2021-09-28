import { NgModule } from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {RegisterComponent} from './register/register.component';
import { LoginComponent } from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
    imports: [
        AuthRoutingModule,
        SharedModule,
        CommonModule,

    ],
  exports: [
    RegisterComponent,
    LoginComponent
  ],
})
export class AuthModule { }
