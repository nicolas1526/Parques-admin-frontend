import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Departamento } from 'src/app/models/departamento.model';
import { Municipio } from 'src/app/models/municipios.model';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { map } from 'rxjs';

@Component({
    templateUrl: './municipios.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./municipios.component.scss'],
})
export class MunicipiosComponent implements OnInit {

    municipios: Municipio[] = [];
    municipioSeleccionado: Municipio = {};
    departamentos: SelectItem[] = [];
    departamentoSeleccionado?: Departamento;
    postOput: boolean = true;
    display: boolean = false;
    loading: boolean = true;


    constructor(
        private serviceMunicipio: MunicipiosService,
        private serviceDepartamento: DepartamentosService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getMunicipios();
        this.getDepartamentos();
    }

    getDepartamentos() {
        this.serviceDepartamento
            .getDepartamentos()
            .pipe(
                map((departamentos) => {

                    return departamentos.map((departamento) => ({
                        label: departamento.nombre,
                        value: {
                            id:departamento.id,
                            nombre:departamento.nombre
                        },
                    }));
                })
            )
            .subscribe(
                (data) => {
                    this.departamentos = data;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    createMunicipio() {
        this.municipioSeleccionado.Departamento = this.departamentoSeleccionado;
        this.municipioSeleccionado.idDepartamento = this.departamentoSeleccionado?.id;
        this.serviceMunicipio
            .createMunicipio(this.municipioSeleccionado)
            .subscribe(
                (data) => {
                    this.municipioSeleccionado.id = data.id;
                    this.municipios.push(this.municipioSeleccionado);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
        this.display = false;
    }

    getMunicipios() {
        this.serviceMunicipio.getMunicipios().subscribe(
            (data) => {
                this.municipios = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteMunicipio(idMunicipio: number) {
        this.serviceMunicipio.deleteMunicipio(idMunicipio).subscribe(
            () => {
                const index = this.municipios.findIndex(
                    (dep) => dep.id === idMunicipio
                );
                this.municipios.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    updateMunicipio(municipio: Municipio) {

        municipio.idDepartamento = this.departamentoSeleccionado?.id;
        this.serviceMunicipio.updateMunicipio(municipio).subscribe(
            (data) => {
                const indexMunicipio = this.municipios.findIndex(
                    (res) => res.id === municipio.id
                );

                const indexDepartamento = this.departamentos.findIndex(
                    (res) => res.value.id === data.idDepartamento
                );
                this.municipios[indexMunicipio] = {
                    id: data.id,
                    nombre: data.nombre,
                    Departamento:{
                        id: data.idDepartamento,
                        nombre: this.departamentos[indexDepartamento].value.nombre
                    }
                }
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdate() {
        if (this.municipioSeleccionado !== undefined) {
            if (this.postOput) {
                this.createMunicipio();
            } else {
                this.updateMunicipio(this.municipioSeleccionado);
            }
            this.display = false;
        }
    }

    openDialogCreate() {
        this.municipioSeleccionado = {};
        this.departamentoSeleccionado = {};
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idMunicipio: number) {

        const index = this.municipios.findIndex(
            (data) => data.id === idMunicipio
        );
        this.municipioSeleccionado = this.municipios[index];
        this.departamentoSeleccionado = this.municipioSeleccionado.Departamento;
        this.display = true;
        this.postOput = false;
    }

    confirmarEliminar(idDepartamento: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este departamento?',
            accept: () => {
                this.deleteMunicipio(idDepartamento);
            },
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
