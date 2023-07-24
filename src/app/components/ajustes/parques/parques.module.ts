import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParquesComponent } from './parques.component';
import { ParquesRoutingModule } from './parques-routing.module';



@NgModule({
  declarations: [
    ParquesComponent
  ],
  imports: [
    CommonModule,
    ParquesRoutingModule
  ]
})
export class ParquesModule { }
