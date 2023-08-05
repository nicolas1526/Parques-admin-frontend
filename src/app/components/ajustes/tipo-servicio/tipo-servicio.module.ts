import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoServicioComponent } from './tipo-servicio.component';
import { TipoServicioRoutingModule } from './tipo-servicio-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeSelectModule } from 'primeng/treeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [TipoServicioComponent],
    imports: [
        CommonModule,
        TipoServicioRoutingModule,
        ToastModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule,
        InputNumberModule,
        InputTextareaModule,
        TreeSelectModule,
        CheckboxModule,
        DropdownModule,
        FileUploadModule,
        FormsModule
    ],
})
export class TipoServicioModule {}
