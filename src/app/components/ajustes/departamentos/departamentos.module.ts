import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentosComponent } from './departamentos.component';
import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    DepartamentosComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class DepartamentosModule { }
