import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaComponent } from './reserva.component';
import { ReservaRoutingModule } from './reserva-routing.module';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ReservaComponent
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    PanelModule,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    TableModule,
    ButtonModule
  ]
})
export class ReservaModule { }
