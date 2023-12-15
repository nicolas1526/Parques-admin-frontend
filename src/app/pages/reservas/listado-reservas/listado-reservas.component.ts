import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { EstadoReserva, Reserva, ReservaDetalle, ReservaOtro } from 'src/app/models/reserva.model';
import { ListadoReservasService } from 'src/app/services/listado-reservas.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TipoServicio } from 'src/app/models/servicio';
import { TipoServicioService } from 'src/app/services/tipo-servicio.service';

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
    reservas: ReservaOtro[] = [];
    tiposServicio: SelectItem[] = [];
    tiposServicioSeleccionada: TipoServicio = {};

    constructor(
        private confirmationService: ConfirmationService,
        private tipoServicioService: TipoServicioService,
        private listadoReservaService: ListadoReservasService
    ) { }

    ngOnInit(): void {
        this.getTipoDeServicios();
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

    getTipoDeServicios(){

        this.tipoServicioService
        .getTiposDeServiciosReservables()
        .pipe(
            map((tiposervicio) => {
                return tiposervicio.map((tipo) => ({
                    label: tipo.nombre,
                    value: {
                        id: tipo.id,
                        nombre: tipo.nombre,
                    },
                }));
            })
        )
        .subscribe(
            (data) => {
                this.tiposServicio = data;

            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    getReservaById(idReserva: string) {
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

    numberFormat(value:number):string{
        return new Intl.NumberFormat('es-CO',{
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    generarPDF(reserva: ReservaDetalle): void {
        const iva = (reserva.DetalleReserva?.valor! * reserva.ServicioParque?.impuesto!)/100;
        const totalConIva = reserva.DetalleReserva?.valor!;
        const totalSinIva = totalConIva-iva;

        const contenidoFactura = [
            [{ text: 'CORPORACION AUTONOMA REGIONAL \nNIT 899.999.062-6\n\nIVA Reg común-IVA incluido', style: 'titulo' }],
            [{ text: `Reserva Nro: ${reserva.codigo}	${reserva.DetalleReserva?.fechaFin}`, style: 'subtitulo' }],
            [{
                table: {
                    headerRows: 1,
                    body: [
                        [
                            { text: 'NroNoches', style: 'headers' },
                            { text: 'Descripción', style: 'headers' },
                            { text: 'Precio unitario', style: 'headers' }
                        ],
                        [
                            { text: `${reserva.DetalleReserva?.numNoches}` ,style: "cuerpoCenter" },
                             `${reserva.ServicioParque?.Servicio.nombre} Desde ${reserva.DetalleReserva?.fechaInicio} Hasta ${reserva.DetalleReserva?.fechaFin}`,
                            { text: `${this.numberFormat(reserva.ServicioParque?.precio!)}` ,style: "cuerpoCenter"}
                        ]
                    ]
                }
            }],
            [{
                table: {
                    headerRows: 1,
                    body: [
                        [{ text: 'Sin Iva', style: 'headersFooter' }, `${this.numberFormat(totalSinIva)}`],
                        [{ text: 'Base IVA', style: 'headersFooter' }, `${this.numberFormat(iva)}`],
                        [{ text: 'Total', style: 'headersFooter' }, `${this.numberFormat(totalConIva)}`],
                    ]
                },
                alignment: 'left',
                layout: 'noBorders'
            }],
            //[{ text: `Sin IVA	$438655 \nBase IVA	$83345 \nTotal	$`, style: 'total' }],
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
                    fontSize: 13,
                    bold: true,
                    alignment: 'center' as const,
                },
                cuerpo: {
                    fontSize: 12,
                },
                cuerpoCenter: {
                    fontSize: 12,
                    alignment: 'center' as const,
                },
                headers: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'center' as const,
                },
                headersFooter: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'left' as const,
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
                this.tiposServicioSeleccionada.id!,
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
        this.cargarTabla();
    }

    onDropdownChangeTipoServicio(event: any) {
        this.cargarTabla();
    }

    cargarTabla(){
        this.loading = true;
        this.reservas = [];
        this.getReservasByEstado();

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
