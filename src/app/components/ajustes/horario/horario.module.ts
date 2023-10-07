import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorarioComponent } from './horario.component';
import { HorarioRoutingModule } from './horario-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    HorarioComponent
  ],
  imports: [
    CommonModule,
    HorarioRoutingModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    TreeSelectModule,
    DropdownModule
  ]
})
export class HorarioModule { }
