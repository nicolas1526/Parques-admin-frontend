import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Informate } from 'src/app/models/informate.model';
import { InformateService } from 'src/app/services/informate.service';
import { map } from 'rxjs';

@Component({
    templateUrl: './informate.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./informate.component.scss'],
})
export class InformateComponent {
    @ViewChild('filter') filter!: ElementRef;
    etiquetas?: string;
    titulo?: string;
    postOput: boolean = true;
    display: boolean = false;
    loading: boolean = true;
    filaExpandida: number = -1;
    filaIndex: number = 1;
    informates: Informate[] = [];
    informateSeleccionado: Informate = {};
    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;

    constructor(
        private informateService: InformateService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.estados = [
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false },
        ];
        this.getInformates();
    }

    getInformates() {
        this.informateService.getInformates().subscribe(
            (data) => {
                this.informates = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createInformate() {
        this.convertToInputArray();
        this.informateSeleccionado.estado = this.estadoSeleccionado;
        this.informateService
            .createInformate(this.informateSeleccionado)
            .subscribe(
                (data) => {
                    this.informateSeleccionado.id = data.id;
                    this.informateSeleccionado.urlImagen = data.urlImagen;
                    this.informates.push(this.informateSeleccionado);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
        this.display = false;
    }

    updateInformate(informate: Informate) {
        this.convertToInputArray();
        this.informateSeleccionado.urlImagen = undefined;
        this.informateSeleccionado.estado = this.estadoSeleccionado;
        this.informateService.updateInformate(informate).subscribe(
            (data) => {
                const indexInformate = this.informates.findIndex(
                    (res) => res.id === informate.id
                );
                this.informates[indexInformate] = {
                    id: data.id,
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    estado: data.estado,
                    urlVerMas: data.urlVerMas,
                    tituloImagen: data.tituloImagen,
                    fecha: data.fecha,
                    urlImagen: data.urlImagen,
                    etiquetas: data.etiquetas,
                };
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteInformate(idInformate: number) {
        this.informateService.deleteInformate(idInformate).subscribe(
            () => {
                const index = this.informates.findIndex(
                    (data) => data.id === idInformate
                );
                this.informates.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdate() {
        if (this.informateSeleccionado !== undefined) {
            if (this.postOput) {
                this.createInformate();
            } else {
                this.updateInformate(this.informateSeleccionado);
            }
            this.display = false;
        }
    }

    openDialogCreate() {
        this.titulo = 'Crear informate';
        this.informateSeleccionado = {};
        this.estadoSeleccionado = true;
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idInformate: number) {
        this.titulo = 'Actualizar informate';
        const index = this.informates.findIndex(
            (data) => data.id === idInformate
        );
        this.informateSeleccionado = this.informates[index];
        this.display = true;
        this.postOput = false;
    }

    confirmarEliminar(idInformate: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este informate?',
            accept: () => {
                this.deleteInformate(idInformate);
            },
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    manejadorArchivoSeleccionado(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.informateSeleccionado.imgBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    convertToInputArray() {
        if (this.etiquetas) {
            this.informateSeleccionado.etiquetas = this.etiquetas
                .split(',')
                .map((item) => item.trim());
        }
        console.log(this.informateSeleccionado.etiquetas)
    }
}
