import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard | Mellowish'}, canActivate: [AuthGuard]},
  {path: '', redirectTo:'/dashboard', pathMatch:'full'}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
