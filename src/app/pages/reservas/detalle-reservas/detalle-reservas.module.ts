import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleReservasComponent } from './detalle-reservas.component';
import { DetalleReservasRoutingModule } from './detalle-reservas-routing.module';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    DetalleReservasComponent
  ],
  imports: [
    CommonModule,
    DetalleReservasRoutingModule,
    PanelModule,
    ConfirmDialogModule,
    TableModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    DialogModule,
    ImageModule,

  ]
})
export class DetalleReservasModule { }
