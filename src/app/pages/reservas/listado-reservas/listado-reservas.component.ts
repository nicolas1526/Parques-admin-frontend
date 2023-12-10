import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { EstadoReserva, Reserva, ReservaDetalle } from 'src/app/models/reserva.model';
import { ListadoReservasService } from 'src/app/services/listado-reservas.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-listado-reservas',
    templateUrl: './listado-reservas.component.html',
    providers: [ConfirmationService],
    styleUrls: ['./listado-reservas.component.scss'],
})
export class ListadoReservasComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    loading: boolean = true;
    estadoReserva: SelectItem[] = [];
    estadoReservaSeleccionado: EstadoReserva = {
        EstadoReservaId: 1,
        NombreEstadoReserva: 'Pendiente',
    };
    reservas: Reserva[] = [];

    constructor(
        private confirmationService: ConfirmationService,
        private listadoReservaService: ListadoReservasService
    ) { }

    ngOnInit(): void {
        this.estadoReserva = [
            {
                label: 'Pendiente',
                value: {
                    EstadoReservaId: 1,
                    NombreEstadoReserva: "'Pendiente'",
                },
            },
            {
                label: 'Aprobada',
                value: {
                    EstadoReservaId: 2,
                    NombreEstadoReserva: "'Aprobada'",
                },
            },
            {
                label: 'Cancelada',
                value: {
                    EstadoReservaId: 3,
                    NombreEstadoReserva: "'Cancelada'",
                },
            },
            {
                label: 'Cancelada por vencimiento',
                value: {
                    EstadoReservaId: 4,
                    NombreEstadoReserva: "'Cancelada por vencimiento'",
                },
            },
        ];
        this.getReservasByEstado();
    }

    getReservaById(idReserva:string) {
        this.listadoReservaService
          .getReservasById(
            idReserva!
          )
          .subscribe(
            (data) => {
              if (data) {
                this.generarPDF(data)
              }
    
            },
            (error) => {
              console.error('Error en la peticion: ', error);
            }
          );
    }
      
    generarPDF(reserva: ReservaDetalle): void {
        const contenidoFactura = [
            [{ text: 'CORPORACION AUTONOMA REGIONAL \nNIT 899.999.062-6\n\nIVA Reg común-IVA incluido', style: 'titulo' }],
            [{ text: `Reserva Nro: ${reserva.codigo}	${reserva.DetalleReserva?.fechaFin}`, style: 'subtitulo' }],
            [{
                table: {
                    body: [
                        ['NroNoches', 'Descripción', 'PrecioUnitario'],
                        [`${reserva.DetalleReserva?.numNoches}`, `${reserva.ServicioParque?.Servicio.nombre} Desde ${reserva.DetalleReserva?.fechaInicio} Hasta ${reserva.DetalleReserva?.fechaFin}`, `${reserva.ServicioParque?.precio}`]
                    ]
                }, style: 'subtitulo'
            }],
            [{ text: `Sin IVA	$438655 \nBase IVA	$83345 \nTotal	$${reserva.DetalleReserva?.valor}`, style: 'total' }],
            [{ text: 'Conserve su tiquete en el parque \nDebe presentar este tiquete al llegar al parque', style: 'footer' }],
        ];

        const documento = {
            content: [
                {
                    table: {
                        body: contenidoFactura,
                    },
                },
            ],
            styles: {
                titulo: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'center' as const,
                },
                subtitulo: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'center' as const,
                },
                cuerpo: {
                    fontSize: 12,
                },
                total: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'right' as const,
                },
                footer: {
                    fontSize: 10,
                    italics: true,
                    alignment: 'center' as const,
                },
            },
        };

        const pdfDocGenerator = pdfMake.createPdf(documento);
        pdfDocGenerator.getBlob((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
        });

    }

    getReservasByEstado() {
        this.listadoReservaService
            .getAllReservasByEstado(
                this.estadoReservaSeleccionado.EstadoReservaId!
            )
            .subscribe(
                (data) => {
                    this.reservas = data;
                    this.loading = false;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    onDropdownChangeEstadoReserva(event: any) {
        this.loading = true;
        this.reservas = [];
        this.getReservasByEstado();
        this.loading = false;
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
