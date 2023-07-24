import { Component, OnInit } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './departamentos.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent {
    display: boolean = false;
    departamentos: Departamento[] = []
    loading: boolean = true;

    constructor(private confirmationService: ConfirmationService) { }

    ngOnInit(){
        this.departamentos=[
            {id:1,nombre:"Boyaca"},
            {id:2,nombre:"Cundinamarca"},
            {id:3,nombre:"Santander"},
            {id:4,nombre:"Bogota"},
            {id:1,nombre:"Boyaca"},
            {id:2,nombre:"Cundinamarca"},
            {id:3,nombre:"Santander"},
            {id:4,nombre:"Bogota"},
            {id:1,nombre:"Boyaca"},
            {id:2,nombre:"Cundinamarca"},
            {id:3,nombre:"Santander"},
            {id:4,nombre:"Chiquinquira"},
            {id:1,nombre:"Boyaca"},
            {id:2,nombre:"Cundinamarca"},
            {id:3,nombre:"Santander"},
            {id:4,nombre:"Bogota"},
        ]
        this.loading = false;
    }

    confirmarEliminar(){
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este departamento?'
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
