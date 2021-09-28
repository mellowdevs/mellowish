import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WishComponent} from "./wish/wish.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [WishComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WishModule { }
