import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaComponent } from './reserva.component';
import { ReservaRoutingModule } from './reserva-routing.module';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

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
    CalendarModule
  ]
})
export class ReservaModule { }
