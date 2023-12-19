import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaDestacadaComponent } from './galeria-destacada.component';
import { GaleriaDestacadaRoutingModule } from './galeria-destacada-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';



@NgModule({
  declarations: [
    GaleriaDestacadaComponent
  ],
  imports: [
    CommonModule,
    GaleriaDestacadaRoutingModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    TreeSelectModule,
    DropdownModule,
    ImageModule,
    FileUploadModule
  ]
})
export class GaleriaDestacadaModule { }
