import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TipoServicio } from 'src/app/models/servicio';
import { TipoServicioService } from 'src/app/services/tipo-servicio.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
    templateUrl: './tipo-servicio.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./tipo-servicio.component.scss'],
})
export class TipoServicioComponent implements OnInit {

    @ViewChild('fileUpload') fileUpload!: FileUpload;
    tipoDeServicioSeleccionado: TipoServicio = {}
    tiposDeServicios: TipoServicio[] = [];
    display: boolean = false;
    loading: boolean = true;
    postOput: boolean = true;


    constructor(
        private confirmationService: ConfirmationService,
        private serviceTipoServicio: TipoServicioService
    ) {}

    ngOnInit(): void {
        this.getTiposDeServicios();
    }

    getTiposDeServicios() {
        this.serviceTipoServicio.getTiposDeServicios().subscribe(
            (data) => {
                this.tiposDeServicios = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createTipoServicio() {
        this.serviceTipoServicio.createTipoDeServicio(this.tipoDeServicioSeleccionado).subscribe(
            (data) => {
                this.tipoDeServicioSeleccionado.id=data.id;
                this.tipoDeServicioSeleccionado.urlIcono= data.urlIcono;
                this.tiposDeServicios.push(this.tipoDeServicioSeleccionado);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }

        )
        this.display = false;
    }

    updateTipoDeServicio(tipoDeServicio: TipoServicio){
        this.serviceTipoServicio.updateTipoDeServicio(tipoDeServicio).subscribe(
            (data) => {
                const index = this.tiposDeServicios.findIndex(
                    (data) => data.id === tipoDeServicio.id
                );
                this.tiposDeServicios[index] = data;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteTipoDeServicio(idTipoServicio:number){
        this.serviceTipoServicio.deleteTipoDeServicio(idTipoServicio).subscribe(
            () => {
                const index = this.tiposDeServicios.findIndex(
                    (dep) => dep.id === idTipoServicio
                );
                this.tiposDeServicios.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        )
    }

    confirmarEliminar(idTipoServicio: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este tipo de servicio?',
            accept: () => {this.deleteTipoDeServicio(idTipoServicio)}
        });
    }

    createOrUpdate() {
        if(this.tipoDeServicioSeleccionado !== undefined ){
            if(this.postOput){
                this.createTipoServicio()
            }else{
                this.updateTipoDeServicio(this.tipoDeServicioSeleccionado);
            }
            this.display = false;
        }
    }

    openDialogCreate(){
        this.tipoDeServicioSeleccionado = {};
        this.fileUpload.clear();
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idTipoServicio:number){
        this.fileUpload.clear();
        const index = this.tiposDeServicios.findIndex(
            (data) => data.id === idTipoServicio
        );
        this.tipoDeServicioSeleccionado = this.tiposDeServicios[index];
        this.tipoDeServicioSeleccionado.imgBase64 = undefined;
        this.display = true;
        this.postOput = false;
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    manejadorArchivoSeleccionado(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.tipoDeServicioSeleccionado.imgBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);
    }


}
