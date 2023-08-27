import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosParqueComponent } from './servicios-parque.component';
import { ServiciosParqueRoutingModule } from './servicios-parque-routing.module';
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

@NgModule({
    declarations: [ServiciosParqueComponent],
    imports: [
        CommonModule,
        ServiciosParqueRoutingModule,
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
    ],
})
export class ServiciosParqueModule {}
