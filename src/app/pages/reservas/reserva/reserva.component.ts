import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { DiasReservaMantenimiento } from 'src/app/models/mantenimiento.model';
import { Parques } from 'src/app/models/parques.model';
import { ServicioParque } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario.model';
import { VerificarPreReservaBody } from 'src/app/models/verificar-prereserva';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { ParquesService } from 'src/app/services/parques.service';
import { PrereservaService } from 'src/app/services/prereserva.service';
import { ServiciosParqueService } from 'src/app/services/servicios-parque.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
    templateUrl: './reserva.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent {
    usuario: Usuario = {
        tipoContrato: {
            id: 0,
            tipo: '',
        },
        Municipio:{
            nombre:''
        }
    };
    visibleDialog:boolean = false;
    messageDialog:string = "";
    titleDialog:string = "";
    parques: SelectItem[] = [];
    parqueSeleccionado: Parques = {};
    cabanias: SelectItem[] = [];
    cabaniaSeleccionada: ServicioParque = {};
    todosLosDias:DiasReservaMantenimiento = {date:[],tipo:[]};
    fechaSeleccionada!: Date[];
    valNocheGratis!:boolean;
    valReservaDescuento!:boolean;
    tieneNocheGratis:boolean = false;
    tieneReservasDescuento:boolean = false;
    numPersonas!:number;
    numMascotas!:number;

    constructor(
        private usuarioService: UsuarioService,
        private serviceParque: ParquesService,
        private serviciosParqueService: ServiciosParqueService,
        private mantenimientoService: MantenimientoService,
        private preReservaService: PrereservaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.getParques();
    }

    getUserByDocument() {
        this.usuarioService
            .getUsuarioPorDocumento(this.usuario.documento!)
            .subscribe(
                (data) => {
                    if(data !== null){
                        this.usuario = data;
                    }else{
                        this.usuario.tipoContrato = {
                            id:0,
                            tipo:"Usuario Nuevo"
                        }
                    }
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    verificarPreReserva(datosPreReserva: VerificarPreReservaBody){
        this.preReservaService
        .verificarPreReserva(datosPreReserva)
        .subscribe(
            (data) => {
                if(data !== null){
                    if(data.code! == 203){
                        this.titleDialog = "Error en verificacion pre-reserva"
                        this.messageDialog = data.msg!;
                        this.visibleDialog = true;
                    }else{
                        console.log("Todo bien")
                    }
                }else{

                }
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    getParques() {
        this.serviceParque
            .getParques()
            .pipe(
                map((parques) => {
                    return parques.map((parque) => ({
                        label: parque.nombre,
                        value: {
                            id: parque.id,
                            nombre: parque.nombre,
                        },
                    }));
                })
            )
            .subscribe(
                (data) => {
                    this.parques = data;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    getCabanias(){

        this.serviciosParqueService
        .getCabañasParque(this.parqueSeleccionado.id)
        .pipe(
            map((cabanias) => {
                return cabanias.map((cabania) => ({
                    label: cabania.Servicio?.nombre,
                    value: {
                        id: cabania.id,
                        nombre: cabania.Servicio?.nombre,
                    },
                }));
            })
        )
        .subscribe(
            (data) => {
                this.cabanias = data;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    getFechasReservaPorServicioParque(idServicioParque: number | undefined) {
        this.todosLosDias = {date:[],tipo:[]};
        const man =
        this.mantenimientoService
            .getManteReservByServicioParque(idServicioParque)
            .subscribe(
                (data) => {
                    data.mantenimiento!.forEach((rango) => {
                        const fechaInicio = new Date(rango.fechaInicio!);
                        fechaInicio.setDate(fechaInicio.getDate() + 1);
                        const fechaFin = new Date(rango.fechaFin!);
                        fechaFin.setDate(fechaFin.getDate() + 1);
                        const fechasEntreRango = this.getFechasEntreRango(
                            fechaInicio,
                            fechaFin,
                            "Mantenimiento"
                        );
                        this.todosLosDias.date.push(...fechasEntreRango.date);
                        this.todosLosDias.tipo.push(...fechasEntreRango.tipo)
                    });
                    data.reserva!.forEach((rango) => {
                        const fechaInicio = new Date(rango.fechaInicio!);
                        fechaInicio.setDate(fechaInicio.getDate() + 1);
                        const fechaFin = new Date(rango.fechaFin!);
                        fechaFin.setDate(fechaFin.getDate() + 1);
                        const fechasEntreRango = this.getFechasEntreRango(
                            fechaInicio,
                            fechaFin,
                            "Reserva"
                        );
                        this.todosLosDias.date.push(...fechasEntreRango.date);
                        this.todosLosDias.tipo.push(...fechasEntreRango.tipo)
                    });
                    data.preReserva!.forEach((rango) => {
                        const fechaInicio = new Date(rango.fechaInicio!);
                        fechaInicio.setDate(fechaInicio.getDate() + 1);
                        const fechaFin = new Date(rango.fechaFin!);
                        fechaFin.setDate(fechaFin.getDate() + 1);
                        const fechasEntreRango = this.getFechasEntreRango(
                            fechaInicio,
                            fechaFin,
                            "PreReserva"
                        );
                        this.todosLosDias.date.push(...fechasEntreRango.date);
                        this.todosLosDias.tipo.push(...fechasEntreRango.tipo)
                    });
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    getFechasEntreRango(fechaInicial: Date, fechaFinal: Date, tipo: string): DiasReservaMantenimiento {
        const fechas = [];
        const tipos = [];
        const fechaTemp = new Date(fechaInicial);

        while (fechaTemp <= fechaFinal) {
            fechas.push(new Date(fechaTemp));
            tipos.push(tipo)
            fechaTemp.setDate(fechaTemp.getDate() + 1);
        }

        return {
            date:fechas,
            tipo:tipos
        };
    }

    onClickAddService(){
        if( this.usuario.documento &&
            this.usuario.nombreCompleto &&
            this.usuario.correo &&
            this.usuario.telefono &&
            this.usuario.direccion &&
            this.usuario.tipoContrato &&
            this.fechaSeleccionada &&
            this.numMascotas>=0 && this.numPersonas>0){
                if( this.fechaSeleccionada[0] && this.fechaSeleccionada[1]){
                   const datosVerificarPreReserva: VerificarPreReservaBody = {
                    idServicioParque:this.cabaniaSeleccionada.id,
                    fechaInicio:this.fechaSeleccionada[0].toISOString().substring(0,10),
                    fechaFin:this.fechaSeleccionada[1].toISOString().substring(0,10),
                    numPersonas:this.numPersonas,
                    numMascotas:this.numMascotas
                   }

                   this.verificarPreReserva(datosVerificarPreReserva)

                }else{
                    this.titleDialog = "Error en rango de fechas"
                    this.messageDialog = "Señor usuario debe seleccionar un rango de fechas.";
                    this.visibleDialog = true;
                }
        }else{
            this.titleDialog = "Error en formulario"
            this.messageDialog = "Señor usuario debe ingresar la información solicitada en el formulario.";
            this.visibleDialog = true;
        }
    }

    onDropdownChangeParque(event: any) {
        this.cabaniaSeleccionada = {}
        this.getCabanias();

    }

    onDropdownChangeCabania(event: any) {
        this.getFechasReservaPorServicioParque(this.cabaniaSeleccionada.id)

    }

    blurDocument(event: Event) {
        this.getUserByDocument();
    }

    dateIsInListMantenimiento(date: any): boolean {
        return this.todosLosDias.date.some((fecha,index) => {
            if(this.todosLosDias.tipo[index] == "Mantenimiento"){
                return (
                    date.day === fecha.getDate() &&
                    date.month == fecha.getMonth() &&
                    date.year === fecha.getFullYear()
                );
            }else{
                return false;
            }
        });
    }
    dateIsInListPreReserva(date: any): boolean {
        return this.todosLosDias.date.some((fecha,index) => {
            if(this.todosLosDias.tipo[index] == "PreReserva"){
                return (
                    date.day === fecha.getDate() &&
                    date.month == fecha.getMonth() &&
                    date.year === fecha.getFullYear()
                );
            }else{
                return false;
            }
        });
    }
    dateIsInListReserva(date: any): boolean {
        return this.todosLosDias.date.some((fecha,index) => {
            if(this.todosLosDias.tipo[index] == "Reserva"){
                return (
                    date.day === fecha.getDate() &&
                    date.month == fecha.getMonth() &&
                    date.year === fecha.getFullYear()
                );
            }else{
                return false;
            }
        });
    }
}
