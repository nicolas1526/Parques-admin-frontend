import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BancosComponent } from './bancos.component';
import { BancosRoutingModule } from './bancos-routing.module';



@NgModule({
  declarations: [
    BancosComponent
  ],
  imports: [
    CommonModule,
    BancosRoutingModule
  ]
})
export class BancosModule { }
