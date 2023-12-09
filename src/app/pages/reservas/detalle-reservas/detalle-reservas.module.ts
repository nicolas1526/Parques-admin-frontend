import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleReservasComponent } from './detalle-reservas.component';
import { DetalleReservasRoutingModule } from './detalle-reservas-routing.module';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    DetalleReservasComponent
  ],
  imports: [
    CommonModule,
    DetalleReservasRoutingModule,
    PanelModule,
    ConfirmDialogModule,
    TableModule
  ]
})
export class DetalleReservasModule { }
