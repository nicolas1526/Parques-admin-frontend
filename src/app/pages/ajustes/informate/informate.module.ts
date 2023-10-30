import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformateComponent } from './informate.component';
import { InformateRoutingModule } from './informate-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [InformateComponent],
    imports: [
        CommonModule,
        InformateRoutingModule,
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
        FileUploadModule,
    ],
})
export class InformateModule {}
