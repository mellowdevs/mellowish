import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {DragDropModule} from "@angular/cdk/drag-drop";



@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        DashboardRoutingModule,
        CommonModule,
        SharedModule,
    ]
})
export class DashboardModule { }
