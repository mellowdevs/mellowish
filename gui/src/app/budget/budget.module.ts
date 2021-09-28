import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {BudgetComponent} from "./budget.component";
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule
  ]
})
export class BudgetModule { }
