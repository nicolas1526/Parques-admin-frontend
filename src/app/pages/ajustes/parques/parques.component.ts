import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Parques } from 'src/app/models/parques.model';
import { Municipio } from 'src/app/models/municipios.model';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { ParquesService } from 'src/app/services/parques.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
    templateUrl: './parques.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./parques.component.scss'],
})
export class ParquesComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('fileUpload1') fileUpload1!: FileUpload;
    @ViewChild('fileUpload2') fileUpload2!: FileUpload;
    municipios: SelectItem[] = [];
    municipiosSeleccionado?: Municipio;
    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;
    parques: Parques[] = [];
    parqueSeleccionado: Parques = {};

    display: boolean = false;
    loading: boolean = true;
    postOput: boolean = true;

    constructor(
        private confirmationService: ConfirmationService,
        private serviceParques: ParquesService,
        private serviceMunicipios: MunicipiosService
    ) {}

    ngOnInit(): void {
        this.estados = [
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false },
        ];
        this.getMunicipios();
        this.getParques();
    }

    getMunicipios() {
        this.serviceMunicipios
            .getMunicipios()
            .pipe(
                map((municipios) => {
                    return municipios.map((municipio) => ({
                        label: municipio.nombre,
                        value: {
                            id: municipio.id,
                            nombre: municipio.nombre,
                        },
                    }));
                })
            )
            .subscribe(
                (data) => {
                    this.municipios = data;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    getParques() {
        this.serviceParques.getParques().subscribe(
            (data) => {
                this.parques = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createParque() {
        this.parqueSeleccionado.idMunicipio = this.municipiosSeleccionado?.id;
        this.parqueSeleccionado.activo = this.estadoSeleccionado;
        this.serviceParques.createParque(this.parqueSeleccionado).subscribe(
            (data) => {
                this.parqueSeleccionado.id = data.id;
                this.parqueSeleccionado.urlImagen = data.urlImagen;
                this.parqueSeleccionado.Municipio = this.municipiosSeleccionado;
                this.parqueSeleccionado.urlImagenBoton = data.urlImagenBoton;
                this.parques.push(this.parqueSeleccionado);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
        this.display = false;
    }

    updateParque(parque: Parques) {
        parque.urlImagen = undefined;
        parque.urlImagenBoton = undefined;
        parque.idMunicipio = this.municipiosSeleccionado?.id;
        parque.activo = this.estadoSeleccionado;
        this.serviceParques.updateParque(parque).subscribe(
            (data) => {

                const index = this.parques.findIndex(
                    (data) => data.id === parque.id
                );
                const municipio = this.municipios.find(item => item.value.id === data.idMunicipio);
                data.Municipio = {nombre:municipio?.value.nombre,id:data.idMunicipio};
                this.parques[index] = data;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteParque(idParque: number) {
        this.serviceParques.deleteParque(idParque).subscribe(
            () => {
                const index = this.parques.findIndex(
                    (data) => data.id === idParque
                );
                this.parques.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdate() {
        if (this.parqueSeleccionado !== undefined) {
            if (this.postOput) {
                this.createParque();
            } else {
                this.updateParque(this.parqueSeleccionado);
            }
            this.display = false;
        }
    }

    openDialogCreate() {
        this.fileUpload1.clear();
        this.fileUpload2.clear();
        this.parqueSeleccionado = {};
        this.municipiosSeleccionado = {};
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idParque: number) {
        this.fileUpload1.clear();
        this.fileUpload2.clear();
        const indexParque = this.parques.findIndex(
            (data) => data.id === idParque
        );
        this.parqueSeleccionado = this.parques[indexParque];
        this.municipiosSeleccionado = {
            id: this.parqueSeleccionado.Municipio?.id,
            nombre: this.parqueSeleccionado.Municipio?.nombre,
        };
        this.estadoSeleccionado = this.parqueSeleccionado.activo;
        this.display = true;
        this.postOput = false;
    }

    confirmarEliminar(idParque: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este servicio?',
            accept: () => {
                this.deleteParque(idParque);
            },
        });
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    manejadorArchivoSeleccionado(event: any, uploaderIdentifier: string) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (uploaderIdentifier === 'imgParque') {
                this.parqueSeleccionado.imgBase64 = reader.result as string;
            } else {
                this.parqueSeleccionado.imgBotonBase64 =
                    reader.result as string;
            }
        };
        reader.readAsDataURL(file);

    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }



}
