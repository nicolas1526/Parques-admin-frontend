import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosParqueComponent } from './servicios-parque.component';
import { ServiciosParqueRoutingModule } from './servicios-parque-routing.module';



@NgModule({
  declarations: [
    ServiciosParqueComponent
  ],
  imports: [
    CommonModule,
    ServiciosParqueRoutingModule
  ]
})
export class ServiciosParqueModule { }
