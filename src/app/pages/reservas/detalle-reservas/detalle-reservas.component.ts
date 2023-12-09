import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReservaDetalle, Usuario } from 'src/app/models/reserva.model';
import { ListadoReservasService } from 'src/app/services/listado-reservas.service';
import { Banco } from 'src/app/models/banco.model';
import { BancoService } from 'src/app/services/bancos.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-detalle-reservas',
  templateUrl: './detalle-reservas.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./detalle-reservas.component.scss']
})
export class DetalleReservasComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('fileUpload') fileUpload1!: FileUpload;
  loading: boolean = false;
  idReserva?: string;
  reserva: ReservaDetalle[] = [];
  bancos: SelectItem[] = [];
  bancoSeleccionado: Banco = {};


  fechaConsignacion?: Date;

  constructor(
    private route: ActivatedRoute,
    private listadoReservaService: ListadoReservasService,
    private bancoService: BancoService
  ) { }

  ngOnInit(): void {
    this.idReserva = this.route.snapshot.paramMap.get('id')!;
    this.getReservaById();
    this.getBancos();
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

  getBancos() {
    this.bancoService
        .getBancos()
        .pipe(
            map((bancos) => {
                return bancos.map((banco) => ({
                    label: banco.nombre,
                    value: {
                        id: banco.id,
                        nombre: banco.nombre,
                    },
                }));
            })
        )
        .subscribe(
            (data) => {
                this.bancos = data;
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

  manejadorArchivoSeleccionado(event: any) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        //this.popUp.imgBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);

}
}
