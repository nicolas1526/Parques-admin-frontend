import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Servicio, TipoServicio } from '../../../models/servicio';
import { TipoServicioService } from 'src/app/services/tipo-servicio.service';
import { ServicioService } from 'src/app/services/servicios.service';
import { map } from 'rxjs';

@Component({
    templateUrl: './servicios.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    tiposDeServicios: SelectItem[] = [];
    tipoDeServicioSeleccionado?: TipoServicio;
    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;
    servicios: Servicio[] = [];
    servicioSeleccionado: Servicio = {};

    display: boolean = false;
    loading: boolean = true;
    postOput: boolean = true;

    constructor(
        private confirmationService: ConfirmationService,
        private serviceTipoServicio: TipoServicioService,
        private serviceServicios: ServicioService
    ) {}

    ngOnInit(): void {
        this.estados = [
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false },
        ];
        this.getTiposDeServicios();
        this.getServicios();

    }

    getTiposDeServicios() {
        this.serviceTipoServicio
            .getTiposDeServicios()
            .pipe(
                map((tiposDeServicios) => {

                    return tiposDeServicios.map((tipoDeServicio) => ({
                        label: tipoDeServicio.nombre,
                        value: {
                            id:tipoDeServicio.id,
                            nombre:tipoDeServicio.nombre
                        },
                    }));
                })
            )
            .subscribe(
                (data) => {
                    this.tiposDeServicios = data;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    getServicios() {
        this.serviceServicios.getServicios().subscribe(
            (data) => {
                this.servicios = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createServicio(){
        this.servicioSeleccionado.TipoServicio = this.tipoDeServicioSeleccionado;
        this.servicioSeleccionado.idTipoServicio = this.tipoDeServicioSeleccionado?.id;
        this.servicioSeleccionado.activo = this.estadoSeleccionado;
        this.serviceServicios
            .createServicio(this.servicioSeleccionado)
            .subscribe(
                (data) => {
                    this.servicioSeleccionado.id = data.id;
                    this.servicios.push(this.servicioSeleccionado);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
        this.display = false;
    }

    deleteServicio(idServicio: number) {
        this.serviceServicios.deleteServicio(idServicio).subscribe(
            () => {
                const index = this.servicios.findIndex(
                    (data) => data.id === idServicio
                );
                this.servicios.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    updateServicio(servicio: Servicio) {

        servicio.idTipoServicio = this.tipoDeServicioSeleccionado?.id;
        servicio.activo = this.estadoSeleccionado;
        this.serviceServicios.updateServicio(servicio).subscribe(
            (data) => {
                const indexServico = this.servicios.findIndex(
                    (res) => res.id === servicio.id
                );

                const indexTipoServicio = this.tiposDeServicios.findIndex(
                    (res) => res.value.id === data.idTipoServicio
                );

                this.servicios[indexServico] = {
                    ...data,
                    TipoServicio:{
                        id: data.idTipoServicio,
                        nombre: this.tiposDeServicios[indexTipoServicio].value.nombre
                    }
                }
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdate() {
        if (this.servicioSeleccionado !== undefined) {
            if (this.postOput) {
                this.createServicio();
            } else {
                this.updateServicio(this.servicioSeleccionado);
            }
            this.display = false;
        }
    }


    openDialogCreate() {
        this.servicioSeleccionado = {};
        this.tipoDeServicioSeleccionado = {};
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idServicio: number) {
        const index = this.servicios.findIndex(
            (data) => data.id === idServicio
        );
        this.servicioSeleccionado = this.servicios[index];
        this.tipoDeServicioSeleccionado = {
            id: this.servicioSeleccionado.TipoServicio?.id,
            nombre: this.servicioSeleccionado.TipoServicio?.nombre,
        }
        this.estadoSeleccionado = this.servicioSeleccionado.activo;
        this.display = true;
        this.postOput = false;
    }


    confirmarEliminar(idServicio: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este servicio?',
            accept: () => {
                this.deleteServicio(idServicio);
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
}
