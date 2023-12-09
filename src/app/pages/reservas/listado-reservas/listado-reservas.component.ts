import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { EstadoReserva, Reserva } from 'src/app/models/reserva.model';
import { ListadoReservasService } from 'src/app/services/listado-reservas.service';

@Component({
    selector: 'app-listado-reservas',
    templateUrl: './listado-reservas.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./listado-reservas.component.scss'],
})
export class ListadoReservasComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    loading: boolean = true;
    estadoReserva: SelectItem[] = [];
    estadoReservaSeleccionado: EstadoReserva = {
        EstadoReservaId: 1,
        NombreEstadoReserva: 'Pendiente',
    };
    reservas: Reserva[] = [];

    constructor(
        private confirmationService: ConfirmationService,
        private listadoReservaService: ListadoReservasService
    ) {}

    ngOnInit(): void {
        this.estadoReserva = [
            {
                label: 'Pendiente',
                value: {
                    EstadoReservaId: 1,
                    NombreEstadoReserva: "'Pendiente'",
                },
            },
            {
                label: 'Aprobada',
                value: {
                    EstadoReservaId: 2,
                    NombreEstadoReserva: "'Aprobada'",
                },
            },
            {
                label: 'Cancelada',
                value: {
                    EstadoReservaId: 3,
                    NombreEstadoReserva: "'Cancelada'",
                },
            },
            {
                label: 'Cancelada por vencimiento',
                value: {
                    EstadoReservaId: 4,
                    NombreEstadoReserva: "'Cancelada por vencimiento'",
                },
            },
        ];
        this.getReservasByEstado();
    }

    getReservasByEstado() {
        this.listadoReservaService
            .getAllReservasByEstado(
                this.estadoReservaSeleccionado.EstadoReservaId!
            )
            .subscribe(
                (data) => {
                    this.reservas = data;
                    this.loading = false;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    onDropdownChangeEstadoReserva(event: any) {
      this.loading = true;
      this.reservas = [];
      this.getReservasByEstado();
      this.loading = false;
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
