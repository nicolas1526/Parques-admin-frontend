import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { map } from 'rxjs';
import { Table } from 'primeng/table';
import { GaleriaParque } from 'src/app/models/galeria-parque.model';
import { Parques } from 'src/app/models/parques.model';
import { GaleriaParqueService } from 'src/app/services/galeria-parque.service';
import { ParquesService } from 'src/app/services/parques.service';

@Component({
    templateUrl: './galeria-parque.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./galeria-parque.component.scss'],
})
export class GaleriaParqueComponent {
    @ViewChild('filter') filter!: ElementRef;
    postOput: boolean = true;
    display: boolean = false;
    loading: boolean = true;
    galeriasAll: GaleriaParque[] = [];
    galerias: GaleriaParque[] = [];
    galeriaSeleccionada: GaleriaParque = {};
    parques: SelectItem[] = [];
    parqueSeleccionado: Parques = {};
    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;

    constructor(
        private galeriaParqueService: GaleriaParqueService,
        private parqueService: ParquesService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.estados = [
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false },
        ];
        this.getParques();
        this.getGalerias();
    }

    getParques() {
        this.parqueService
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

    getGalerias() {
        this.galeriaParqueService.getGaleriaParques().subscribe(
            (data) => {
                this.galeriasAll = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createGaleria() {
        this.galeriaSeleccionada.Parque = this.parqueSeleccionado;
        this.galeriaSeleccionada.idParque = this.parqueSeleccionado?.id;
        this.galeriaSeleccionada.estado = this.estadoSeleccionado;
        this.galeriaParqueService
            .createGaleriaParque(this.galeriaSeleccionada)
            .subscribe(
                (data) => {
                    this.galeriaSeleccionada.id = data.id;
                    this.galeriaSeleccionada.urlImagen = data.urlImagen;
                    this.galerias.push(this.galeriaSeleccionada);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
        this.display = false;
    }

    updateGaleria(galeriaParque: GaleriaParque) {
        galeriaParque.idParque = this.parqueSeleccionado?.id;
        this.galeriaSeleccionada.estado = this.estadoSeleccionado;
        this.galeriaParqueService.updateGaleriaParque(galeriaParque).subscribe(
            (data) => {
                const indexHorario = this.galerias.findIndex(
                    (res) => res.id === galeriaParque.id
                );

                const indexParque = this.parques.findIndex(
                    (res) => res.value.id === data.idParque
                );
                this.galerias[indexHorario] = {
                    id: data.id,
                    titulo: data.titulo,
                    urlImagen: data.urlImagen,
                    estado: data.estado,
                    idParque: data.idParque,
                    Parque: {
                        id: data.idParque,
                        nombre: this.parques[indexParque].value.nombre,
                    },
                };
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteGaleria(idGaleria: number) {
        this.galeriaParqueService.deleteGaleriaParque(idGaleria).subscribe(
            () => {
                const index = this.galerias.findIndex(
                    (data) => data.id === idGaleria
                );
                this.galerias.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdate() {
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

    openDialogUpdate(idGaleriaParque: number) {
        const index = this.galerias.findIndex(
            (data) => data.id === idGaleriaParque
        );
        this.galeriaSeleccionada = this.galerias[index];
        this.parqueSeleccionado = {
            id: this.galeriaSeleccionada.Parque?.id,
            nombre: this.galeriaSeleccionada.Parque?.nombre,
        };
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

    onDropdownChangeParque(event: any) {
        this.loading = true;
        const galeriaParqueFiltrado = this.galeriasAll.filter(
            (objeto) => objeto.Parque?.id === this.parqueSeleccionado?.id
        );
        this.galerias = galeriaParqueFiltrado;
        this.loading = false;
    }
}
