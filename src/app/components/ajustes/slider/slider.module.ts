import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { SliderRoutingModule } from './slider-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [SliderComponent],
    imports: [
        CommonModule,
        SliderRoutingModule,
        ToastModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule,
        InputTextareaModule,
        CheckboxModule,
        DropdownModule,
        FormsModule,
        ImageModule,
        FileUploadModule,
    ],
})
export class SliderModule {}
