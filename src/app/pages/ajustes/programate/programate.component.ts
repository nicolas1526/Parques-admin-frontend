import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Programate } from 'src/app/models/programate.model';
import { ProgramateService } from 'src/app/services/programate.service';

@Component({
  templateUrl: './programate.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./programate.component.scss']
})
export class ProgramateComponent {
    @ViewChild('filter') filter!: ElementRef;
    titulo?: string;
    postOput: boolean = true;
    display: boolean = false;
    loading: boolean = true;
    programates: Programate[] = [];
    programateSeleccionado: Programate = {};
    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;

    constructor(
        private programateService: ProgramateService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.estados = [
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false },
        ];
        this.getProgramates();
    }

    getProgramates() {
        this.programateService.getProgramate().subscribe(
            (data) => {
                this.programates = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createProgramate() {
        this.programateSeleccionado.estado = this.estadoSeleccionado;
        this.programateService
            .createProgramate(this.programateSeleccionado)
            .subscribe(
                (data) => {
                    this.programateSeleccionado.id = data.id;
                    this.programateSeleccionado.urlImagen = data.urlImagen;
                    this.programates.push(this.programateSeleccionado);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
        this.display = false;
    }

    updateProgramate(programate: Programate) {
        this.programateSeleccionado.urlImagen = undefined;
        this.programateSeleccionado.estado = this.estadoSeleccionado;
        this.programateService.updateProgramate(programate).subscribe(
            (data) => {
                const indexProgramate = this.programates.findIndex(
                    (res) => res.id === programate.id
                );
                this.programates[indexProgramate] = {
                    id: data.id,
                    estado: data.estado,
                    descripcion: data.descripcion,
                    urlImagen: data.urlImagen,
                };
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteProgramate(idProgramate: number) {
        this.programateService.deleteProgramate(idProgramate).subscribe(
            () => {
                const index = this.programates.findIndex(
                    (data) => data.id === idProgramate
                );
                this.programates.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdate() {
        if (this.programateSeleccionado !== undefined) {
            if (this.postOput) {
                this.createProgramate();
            } else {
                this.updateProgramate(this.programateSeleccionado);
            }
            this.display = false;
        }
    }

    confirmarEliminar(idProgramate: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este programate?',
            accept: () => {
                this.deleteProgramate(idProgramate);
            },
        });
    }

    openDialogCreate() {
        this.titulo = 'Crear programate';
        this.programateSeleccionado = {};
        this.estadoSeleccionado = true;
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idProgramate: number) {
        this.titulo = 'Actualizar programate';
        const index = this.programates.findIndex(
            (data) => data.id === idProgramate
        );
        this.programateSeleccionado = this.programates[index];
        this.display = true;
        this.postOput = false;
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
            this.programateSeleccionado.imgBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);
    }


}
