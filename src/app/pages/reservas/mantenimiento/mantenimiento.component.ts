import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem, MessageService } from 'primeng/api';
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
    providers: [MessageService,ConfirmationService],
    styleUrls: ['./mantenimiento.component.scss'],
})
export class MantenimientoComponent {

    @ViewChild('filter') filter!: ElementRef;
    parques: SelectItem[] = [];
    parqueSeleccionado: Parques = {};
    cabanias: SelectItem[] = [];
    cabaniaSeleccionada: ServicioParque = {};
    mantenimientos: Mantenimiento[] = [];
    mantenimientoSeleccionado: Mantenimiento = {FechaFin:'',FechaInicio:''};




    fechaSeleccionada!: Date[];
    todosLosDias: Date[] = [];
    display: boolean = false;
    loading: boolean = true;
    postOput: boolean = true;



    constructor(
        private mantenimientoService: MantenimientoService,
        private serviceParque: ParquesService,
        private serviciosParqueService: ServiciosParqueService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,

    ) {}

    ngOnInit() {
        this.getParques();
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

    getFechasMantenimientoPorServicioParque(idServicioParque: number | undefined) {
        this.todosLosDias = []
        this.mantenimientoService
            .getMantenimientosByServicioParque(idServicioParque)
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

    createMantenimiento(){
        this.mantenimientoSeleccionado.ServicioId = this.cabaniaSeleccionada.id;
        try {
            if(this.fechaSeleccionada[1] !== null){
                this.mantenimientoSeleccionado.FechaInicio = this.fechaSeleccionada[0].toISOString().substring(0,10);
                this.mantenimientoSeleccionado.FechaFin = this.fechaSeleccionada[1].toISOString().substring(0,10);
            }else{
                this.mantenimientoSeleccionado.FechaInicio = this.fechaSeleccionada[0].toISOString().substring(0,10);
                this.mantenimientoSeleccionado.FechaFin = this.fechaSeleccionada[0].toISOString().substring(0,10);
            }
            this.mantenimientoService
            .createMantenimiento(this.mantenimientoSeleccionado!)
            .subscribe(
                (data) => {
                    this.mantenimientoSeleccionado.MantenimientoId = data.MantenimientoId;
                    this.mantenimientos.push(this.mantenimientoSeleccionado!);
                    this.getFechasMantenimientoPorServicioParque(this.cabaniaSeleccionada.id);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
            this.display = false;
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un rango de fechas' });
        }
    }

    updateMantenimiento(mantenimiento: Mantenimiento) {
        try {
            if(this.fechaSeleccionada[1] !== null){
                mantenimiento.FechaInicio = this.fechaSeleccionada[0].toISOString().substring(0,10);
                mantenimiento.FechaFin = this.fechaSeleccionada[1].toISOString().substring(0,10);
            }else{
                mantenimiento.FechaInicio = this.fechaSeleccionada[0].toISOString().substring(0,10);
                mantenimiento.FechaFin = this.fechaSeleccionada[0].toISOString().substring(0,10);
            }
            this.mantenimientoService
            .updateMantenimiento(mantenimiento)
            .subscribe(
                (data) => {
                    this.mantenimientos.push(mantenimiento);
                    this.getFechasMantenimientoPorServicioParque(this.cabaniaSeleccionada.id);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
            this.display = false;
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un rango de fechas' });
        }
    }

    deleteMantenimiento(idMantenimiento: number){
        this.mantenimientoService.deleteMantenimiento(idMantenimiento).subscribe(
            () => {
                const index = this.mantenimientos.findIndex(
                    (data) => data.MantenimientoId === idMantenimiento
                );
                this.mantenimientos.splice(index, 1);
                this.getFechasMantenimientoPorServicioParque(this.cabaniaSeleccionada.id);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }



    createOrUpdate() {

        if (this.mantenimientoSeleccionado !== undefined) {
            if (this.postOput) {
                this.createMantenimiento();
            } else {
                this.updateMantenimiento(this.mantenimientoSeleccionado);
            }

        }
    }

    openDialogCreate() {
        this.mantenimientoSeleccionado = {FechaFin:'',FechaInicio:''}
        this.fechaSeleccionada = []
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idMantenimiento: number) {
        const indexMantenimiento = this.mantenimientos.findIndex(
            (data) => data.MantenimientoId === idMantenimiento
        );

        this.mantenimientoSeleccionado = {
            MantenimientoId: idMantenimiento,
            ServicioId: this.cabaniaSeleccionada.id,
            FechaInicio: this.mantenimientos[indexMantenimiento].FechaInicio,
            FechaFin: this.mantenimientos[indexMantenimiento].FechaFin
        }

        this.display = true;
        this.postOput = false;

    }

    confirmarEliminar(idMantenimiento: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este mantenimiento?',
            accept: () => {
                this.deleteMantenimiento(idMantenimiento);
            },
        });
    }

    onDropdownChangeCabania(event: any) {
        this.loading = true;
        this.getFechasMantenimientoPorServicioParque(this.cabaniaSeleccionada.id)

    }

    onDropdownChangeParque(event: any) {
        this.cabaniaSeleccionada = {}
        this.getCabanias();

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


}
