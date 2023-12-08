import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleReservasComponent } from './detalle-reservas.component';
import { DetalleReservasRoutingModule } from './detalle-reservas-routing.module';



@NgModule({
  declarations: [
    DetalleReservasComponent
  ],
  imports: [
    CommonModule,
    DetalleReservasRoutingModule
  ]
})
export class DetalleReservasModule { }
