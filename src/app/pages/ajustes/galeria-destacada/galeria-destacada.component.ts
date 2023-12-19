import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { map } from 'rxjs';
import { Table } from 'primeng/table';
import { GaleriaDestacada } from 'src/app/models/galeria-parque.model';
import { GaleriaDestacadaService } from 'src/app/services/galeria-destacada.service';

@Component({
    selector: 'app-galeria-destacada',
    templateUrl: './galeria-destacada.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./galeria-destacada.component.scss'],
})
export class GaleriaDestacadaComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    postOput: boolean = true;
    display: boolean = false;
    loading: boolean = true;
    galeria: GaleriaDestacada[] = [];
    galeriaSeleccionada: GaleriaDestacada = {};
    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;

    constructor(
        private galeriaDestacadaService: GaleriaDestacadaService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.estados = [
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false },
        ];
        this.getGalerias();
    }

    getGalerias() {
        this.galeriaDestacadaService.getGaleriaDestacadas().subscribe(
            (data) => {
                this.galeria = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createGaleria() {
        this.galeriaSeleccionada.estado = this.estadoSeleccionado;
        this.galeriaDestacadaService
            .createGaleriaDestacada(this.galeriaSeleccionada)
            .subscribe(
                (data) => {
                    this.galeriaSeleccionada.id = data.id;
                    this.galeriaSeleccionada.urlImagen = data.urlImagen;
                    this.galeria.push(this.galeriaSeleccionada);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
        this.display = false;
    }

    updateGaleria(galeria: GaleriaDestacada) {
        this.galeriaSeleccionada.estado = this.estadoSeleccionado;
        this.galeriaDestacadaService.updateGaleriaDestacada(galeria).subscribe(
            (data) => {
                const index = this.galeria.findIndex(
                    (res) => res.id === galeria.id
                );
                this.galeria[index] = {
                    id: data.id,
                    titulo: data.titulo,
                    urlImagen: data.urlImagen,
                    estado: data.estado,
                };
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteGaleria(idGaleria: number) {
        this.galeriaDestacadaService.deleteGaleriaDestacada(idGaleria).subscribe(
            () => {
                const index = this.galeria.findIndex(
                    (data) => data.id === idGaleria
                );
                this.galeria.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdate(){
        if (this.galeriaSeleccionada !== undefined) {
            if (this.postOput) {
                this.createGaleria();
            } else {
                this.updateGaleria(this.galeriaSeleccionada);
            }
            this.display = false;
        }
    }

    openDialogCreate() {
        this.galeriaSeleccionada = {};
        this.estadoSeleccionado = true;
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idGaleriaDestacada: number) {
        const index = this.galeria.findIndex(
            (data) => data.id === idGaleriaDestacada
        );
        this.galeriaSeleccionada = this.galeria[index];
        this.display = true;
        this.postOput = false;
    }

    confirmarEliminar(idGaleria: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar esta galeria?',
            accept: () => {
                this.deleteGaleria(idGaleria);
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
            this.galeriaSeleccionada.imgBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}
