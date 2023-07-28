import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Servicio } from '../../models/servicio';

@Component({
    templateUrl: './servicios.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./servicios.component.scss'],
})

export class ServiciosComponent implements OnInit {

    display: boolean = false;
    loading: boolean = true;
    servicios: Servicio[] = []

    constructor(private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.loading = false;
    }

    confirmarEliminar() {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este departamento?',
        });
    }



    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
