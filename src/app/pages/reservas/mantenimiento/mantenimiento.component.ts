import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { Mantenimiento } from 'src/app/models/mantenimiento.model';

import { Parques } from 'src/app/models/parques.model';
import { ParquesService } from 'src/app/services/parques.service';
import { ServiciosParqueService } from 'src/app/services/servicios-parque.service';
import {
    Servicio,
    ServicioParque
} from '../../../models/servicio';

@Component({
    templateUrl: './mantenimiento.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./mantenimiento.component.scss'],
})
export class MantenimientoComponent {

    @ViewChild('filter') filter!: ElementRef;
    parques: SelectItem[] = [];
    parqueSeleccionado: Parques = {};
    cabanias: SelectItem[] = [];
    cabaniaSeleccionada: ServicioParque = {};


    mantenimientos: Mantenimiento[] = [];
    mantenimientoSeleccionado?: Mantenimiento;


    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;
    servicios: SelectItem[] = [];
    servicioSeleccionado: Servicio = {};


    display: boolean = false;
    loading: boolean = true;
    postOput: boolean = true;
    esCabana: boolean = false;

    date5!: Date[];
    todosLosDias: Date[] = [];
    invalidDates!: Array<Date>;
    rangosDeFechas = [
        {
            fechaInicial: new Date(2023, 9, 1),
            fechaFinal: new Date(2023, 9, 5),
        },
        {
            fechaInicial: new Date(2023, 9, 10),
            fechaFinal: new Date(2023, 9, 15),
        },
    ];

    constructor(
        private mantenimientoService: MantenimientoService,
        private serviceParque: ParquesService,
        private serviciosParqueService: ServiciosParqueService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.getParques();
        this.getFechasMantenimientoPorServicioParque(136);
    }

    getParques() {
        this.serviceParque
            .getParques()
            .pipe(
                map((parques) => {
                    return parques.map((parque) => ({
                        label: parque.nombre,
                        value: {
                            id: parque.id,
                            nombre: parque.nombre,
                        },
                    }));
                })
            )
            .subscribe(
                (data) => {
                    this.parques = data;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    getCabanias(){

        this.serviciosParqueService
        .getCabañasParque(this.parqueSeleccionado.id)
        .pipe(
            map((cabanias) => {
                return cabanias.map((cabania) => ({
                    label: cabania.Servicio?.nombre,
                    value: {
                        id: cabania.id,
                        nombre: cabania.Servicio?.nombre,
                    },
                }));
            })
        )
        .subscribe(
            (data) => {
                this.cabanias = data;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }



    onDropdownChangeCabania(event: any) {
        this.loading = true;
        this.getFechasMantenimientoPorServicioParque(this.cabaniaSeleccionada.id)
    }

    onDropdownChangeParque(event: any) {
        this.cabaniaSeleccionada = {}
        this.getCabanias();

    }


    getFechasMantenimientoPorServicioParque(idServicioParque: number | undefined) {
        this.mantenimientoService
            .getDepartamentosByIdServicioParque(idServicioParque)
            .subscribe(
                (data) => {
                    this.mantenimientos = data;
                    data.forEach((rango) => {
                        const fechaInicio = new Date(rango.FechaInicio);
                        fechaInicio.setDate(fechaInicio.getDate() + 1);
                        const fechaFin = new Date(rango.FechaFin);
                        fechaFin.setDate(fechaFin.getDate() + 1);
                        const fechasEntreRango = this.getFechasEntreRango(
                            fechaInicio,
                            fechaFin
                        );
                        this.todosLosDias.push(...fechasEntreRango);
                    });
                    this.loading = false;
                    console.log(this.mantenimientos)
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    getFechasEntreRango(fechaInicial: Date, fechaFinal: Date): Date[] {
        const fechas = [];
        const fechaTemp = new Date(fechaInicial);

        while (fechaTemp <= fechaFinal) {
            fechas.push(new Date(fechaTemp));
            fechaTemp.setDate(fechaTemp.getDate() + 1);
        }

        return fechas;
    }

    openDialogCreate() {
        this.display = true;
        this.postOput = true;
    }

    dateIsInList(date: any): boolean {
        return this.todosLosDias.some((fecha) => {
            return (
                date.day === fecha.getDate() &&
                date.month == fecha.getMonth() &&
                date.year === fecha.getFullYear()
            );
        });
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

    toggleCheckbox() {
        this.esCabana = !this.esCabana;
      }

}
