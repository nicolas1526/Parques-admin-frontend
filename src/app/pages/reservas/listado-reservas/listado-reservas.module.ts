import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoReservasComponent } from './listado-reservas.component';
import { ListadoReservasRoutingModule } from './listado-reservas-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    ListadoReservasComponent
  ],
  imports: [
    CommonModule,
    ListadoReservasRoutingModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    FormsModule
  ]
})
export class ListadoReservasModule { }
