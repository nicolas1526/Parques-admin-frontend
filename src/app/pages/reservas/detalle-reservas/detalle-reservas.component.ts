import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { ReservaDetalle, Usuario } from 'src/app/models/reserva.model';
import { ListadoReservasService } from 'src/app/services/listado-reservas.service';

@Component({
  selector: 'app-detalle-reservas',
  templateUrl: './detalle-reservas.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./detalle-reservas.component.scss']
})
export class DetalleReservasComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  loading: boolean = false;
  idReserva?: string;
  reserva: ReservaDetalle[] = [];

  constructor(
    private route: ActivatedRoute,
    private listadoReservaService: ListadoReservasService
  ) { }

  ngOnInit(): void {
    this.idReserva = this.route.snapshot.paramMap.get('id')!;
    this.getReservaById();
  }

  getReservaById() {
    this.listadoReservaService
      .getReservasById(
        this.idReserva!
      )
      .subscribe(
        (data) => {
          if(data){
            this.reserva.push(data);
            this.loading = true;
          }
          
        },
        (error) => {
          console.error('Error en la peticion: ', error);
        }
      );
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
