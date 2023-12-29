import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import {
    Servicio,
    ServicioParque,
    TipoServicio,
} from '../../../models/servicio';
import { TipoServicioService } from 'src/app/services/tipo-servicio.service';
import { ServicioService } from 'src/app/services/servicios.service';
import { map } from 'rxjs';
import { Parques } from 'src/app/models/parques.model';
import { ParquesService } from 'src/app/services/parques.service';
import { ServiciosParqueService } from 'src/app/services/servicios-parque.service';

@Component({
    templateUrl: './servicios-parque.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./servicios-parque.component.scss'],
})
export class ServiciosParqueComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    mycheckbox:string = "true"
    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;
    servicios: SelectItem[] = [];
    servicioSeleccionado: Servicio = {};
    parques: SelectItem[] = [];
    parqueSeleccionado: Parques = {};
    serviciosParqueAll: ServicioParque[] = [];
    serviciosParque: ServicioParque[] = [];
    servicioParqueSeleccionado: ServicioParque = {};
    tiposServicio: TipoServicio[] = [];
    display: boolean = false;
    loading: boolean = true;
    postOput: boolean = true;
    esCabana: boolean = false;

    constructor(
        private confirmationService: ConfirmationService,
        private serviceParque: ParquesService,
        private serviceServiciosParque: ServiciosParqueService,
        private tipoServicioService: TipoServicioService,
        private serviceServicios: ServicioService
    ) {}

    ngOnInit(): void {
        this.estados = [
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false },
        ];
        this.getServicio();
        this.getParques();
        this.getServiciosParque();
        this.getTipoDeServiciosReservables();
    }

    getServicio() {
        this.serviceServicios
            .getServicios()
            .pipe(
                map((servicios) => {
                    return servicios
                        .filter(servicio => servicio.activo === true)
                        .map((servicio) => ({
                            label: servicio.nombre,
                            value: {
                                id: servicio.id,
                                nombre: servicio.nombre,
                                idTipoServicio: servicio.TipoServicio!.id
                            },
                        }));
                })
            )
            .subscribe(
                (data) => {
                    this.servicios = data;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    getTipoDeServiciosReservables(){
        this.tipoServicioService
        .getTiposDeServiciosReservables()
        .subscribe(
            (data) => {
                this.tiposServicio = data;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
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

    getServiciosParque() {
        this.serviceServiciosParque.getServiciosParque().subscribe(
            (data) => {
                this.serviciosParqueAll = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteServicioParque(idServicioParque: number){
        this.serviceServiciosParque.deleteServiciosParque(idServicioParque).subscribe(
            () => {
                const index = this.serviciosParque.findIndex(
                    (data) => data.id === idServicioParque
                );
                this.serviciosParque.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createServicioParque(){
        this.servicioParqueSeleccionado.Servicio = this.servicioSeleccionado;
        this.servicioParqueSeleccionado.idParque = this.parqueSeleccionado?.id;
        this.servicioParqueSeleccionado.idServicio = this.servicioSeleccionado?.id;
        this.servicioParqueSeleccionado.activo = this.estadoSeleccionado;
        this.serviceServiciosParque
            .createServiciosParque(this.servicioParqueSeleccionado)
            .subscribe(
                (data) => {
                    this.servicioParqueSeleccionado.cantidadMascotas = data.cantidadMascotas == 0 ? null : data.cantidadMascotas;
                    this.servicioParqueSeleccionado.cantidadPersonas = data.cantidadPersonas == 0 ? null : data.cantidadPersonas;
                    this.servicioParqueSeleccionado.id = data.id;
                    this.serviciosParque.push(this.servicioParqueSeleccionado);
                    this.display = false;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    updateServicioParque(){
        this.servicioParqueSeleccionado.idServicio = this.servicioSeleccionado.id;
        this.servicioParqueSeleccionado.activo = this.estadoSeleccionado;
        this.serviceServiciosParque
            .updateServiciosParque(this.servicioParqueSeleccionado)
            .subscribe(
                (data) => {
                    const indexServico = this.servicios.findIndex(
                        (res) => res.value.id === data.idServicio
                    );
                    this.servicioParqueSeleccionado.Servicio!.nombre = this.servicios[indexServico].value.nombre;
                    this.display = false;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    onDropdownChangeParque(event: any) {
        this.loading = true;
        const serviciosParqueFiltrado = this.serviciosParqueAll.filter(
            (objeto) => objeto.idParque === this.parqueSeleccionado.id
        );
        this.serviciosParque = serviciosParqueFiltrado;
        this.loading = false;
    }

    createOrUpdate() {
        if (this.servicioSeleccionado !== undefined) {
            if (this.postOput) {
                this.createServicioParque();
            } else {
                this.updateServicioParque();
            }
        }
    }

    openDialogCreate() {
        this.esCabana = false;
        this.servicioParqueSeleccionado = {}
        this.estadoSeleccionado = true;
        this.servicioSeleccionado = {};
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idServicioParque: number) {
        this.servicioParqueSeleccionado = {};
        this.servicioSeleccionado = {};
        const index = this.serviciosParque.findIndex(
          (data) => data.id === idServicioParque
        );
        this.servicioParqueSeleccionado = this.serviciosParque[index];
        this.esReservable(this.servicioParqueSeleccionado.Servicio!.idTipoServicio!);
        

        const indexServico = this.servicios.findIndex(
            (res) => res.value.id === this.servicioParqueSeleccionado.Servicio!.id
        );

        this.servicioSeleccionado = this.servicios[indexServico].value;

        this.display = true;
        this.postOput = false;
    }

    confirmarEliminar(idServicioParque: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este servicio?',
            accept: () => {
                this.deleteServicioParque(idServicioParque);
            },
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

    esReservable(idTipoServicio:number){
        console.log(idTipoServicio)
        console.log(this.tiposServicio.some(item => item.id === idTipoServicio && item.reservable === true))
        if(this.tiposServicio.some(item => item.id === idTipoServicio && item.reservable === true)){
            this.esCabana = true;
        }else{
            this.esCabana = false;
            this.servicioParqueSeleccionado.cantidadMascotas = null;
            this.servicioParqueSeleccionado.cantidadPersonas = null;
            
        }
    }



    onClickCancelar(){
        this.display = false;
    }
}
