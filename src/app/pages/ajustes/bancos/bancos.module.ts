import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BancosComponent } from './bancos.component';
import { BancosRoutingModule } from './bancos-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';



@NgModule({
  declarations: [
    BancosComponent
  ],
  imports: [
    CommonModule,
    BancosRoutingModule,
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
export class BancosModule { }
