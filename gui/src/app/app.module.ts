import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DashboardModule} from './dashboard/dashboard.module';
import { CategoryComponent } from './category/category/category.component';
import {CategoryModule} from "./category/category.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WishComponent } from './wish/wish/wish.component';
import {WishModule} from "./wish/wish.module";
import { BudgetComponent } from './budget/budget.component';
import {BudgetModule} from "./budget/budget.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    SharedModule,
    CategoryModule,
    WishModule,
    NgxWebstorageModule.forRoot(),
    NgbModule,
    BudgetModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
