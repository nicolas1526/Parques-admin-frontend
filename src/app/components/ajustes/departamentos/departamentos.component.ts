import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { Departamento } from '../../../models/departamento.model';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './departamentos.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./departamentos.component.scss'],
})
export class DepartamentosComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    nameDepartemento: string = "";
    postOput: boolean = true;
    display: boolean = false;
    departamentos: Departamento[] = [];
    loading: boolean = true;
    departamentoId: number = 0;
    constructor(
        private service: DepartamentosService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.getDepartamentos();
    }

    createDepartamento(){
        const nuevoDepartamento: Departamento = {
            nombre: this.nameDepartemento
        }
        this.service.createDepartamento(nuevoDepartamento).subscribe(
            (data) => {
                this.departamentos.push(data);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }

        )
    }

    getDepartamentos() {
        this.service.getDepartamentos().subscribe(
            (data) => {
                this.departamentos = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    updateDepartamento(idDepartamento:number){
        const index = this.departamentos.findIndex(
            (dep) => dep.id === idDepartamento
        );

        const departamento = this.departamentos[index];
        departamento.nombre = this.nameDepartemento;

        this.service.updateDepartamento(departamento).subscribe(
            (data) => {
                const index = this.departamentos.findIndex(
                    (dep) => dep.id === departamento.id
                );
                this.departamentos[index] = data;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteDepartamento(idDepartamento: number) {
        this.service.deleteDepartamento(idDepartamento).subscribe(
            () => {
                const index = this.departamentos.findIndex(
                    (dep) => dep.id === idDepartamento
                );
                this.departamentos.splice(index, 1);
            },
            (error) => {
                alert("Error al eliminar")
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdateDepartamento(){
        if(this.nameDepartemento != ""){
            if(this.postOput){
                this.createDepartamento()
            }else{
                this.updateDepartamento(this.departamentoId);
            }
            this.display = false;
            this.clearInputs();
        }
    }

    confirmarEliminar(idDepartamento:number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este departamento?',
            accept: () => {this.deleteDepartamento(idDepartamento)}
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clearInputs(){
        this.nameDepartemento = "";
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
