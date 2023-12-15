import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, SelectItem, MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { DiasReservaMantenimiento } from 'src/app/models/mantenimiento.model';
import { Municipio } from 'src/app/models/municipios.model';
import { Parques } from 'src/app/models/parques.model';
import { ServicioParque, TipoServicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario.model';
import { DatosPreReserva, DatosReservaBody, VerificarPreReservaBody } from 'src/app/models/verificar-prereserva';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { ParquesService } from 'src/app/services/parques.service';
import { PrereservaService } from 'src/app/services/prereserva.service';
import { ServiciosParqueService } from 'src/app/services/servicios-parque.service';
import { TipoServicioService } from 'src/app/services/tipo-servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
    templateUrl: './reserva.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent {
    @ViewChild('Formulario') formulario!: NgForm;

    usuario: Usuario = {
        tipoContrato: {
            id: 0,
            tipo: '',
        },
        Municipio: {
            nombre: '',
        },
    };
    visibleInfoReserva = true;
    visibleDetalleReserva = false;
    dialog = {
        color: '',
        visible:false,
        message:'',
        title:'',
        icon:''
    }
    parques: SelectItem[] = [];
    parqueSeleccionado: Parques = {};
    cabanias: SelectItem[] = [];
    cabaniaSeleccionada: ServicioParque = {};
    municipios: SelectItem[] = [];
    municipiosSeleccionado?: Municipio;
    todosLosDias: DiasReservaMantenimiento = { date: [], tipo: [] };
    fechaSeleccionada!: Date[];
    valNocheGratis!: string;
    valReservaDescuento!: string;
    tiposServicio: SelectItem[] = [];
    tiposServicioSeleccionada: TipoServicio = {};
    datosPreReserva: DatosPreReserva[] = [];

    datosReserva: DatosReservaBody = {};

    constructor(
        private usuarioService: UsuarioService,
        private serviceParque: ParquesService,
        private serviciosParqueService: ServiciosParqueService,
        private mantenimientoService: MantenimientoService,
        private preReservaService: PrereservaService,
        private serviceMunicipios: MunicipiosService,
        private tipoServicioService: TipoServicioService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.getParques();
        this.getMunicipios();
        this.getTipoDeServicios();
    }
    getMunicipios() {
        this.serviceMunicipios
            .getMunicipios()
            .pipe(
                map((municipios) => {
                    return municipios.map((municipio) => ({
                        label: municipio.nombre,
                        value: {
                            id: municipio.id,
                            nombre: municipio.nombre,
                        },
                    }));
                })
            )
            .subscribe(
                (data) => {
                    this.municipios = data;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
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

    getUserByDocument() {
        this.municipiosSeleccionado = undefined;
        this.datosReserva = {}
        this.valNocheGratis = '';
        this.valReservaDescuento = '';
        this.usuarioService
            .getUsuarioPorDocumento(this.usuario.documento!)
            .subscribe(
                (data) => {
                    console.log(data)
                    if (data !== null) {
                        this.usuario = data;
                        this.municipiosSeleccionado = {
                            id: this.usuario.Municipio?.id,
                            nombre: this.usuario.Municipio?.nombre,
                        };
                    } else {
                        this.usuario = {
                            documento: this.usuario.documento,
                            tipoContrato: {
                                id: 0,
                                tipo: 'Usuario Nuevo',
                            },
                            Municipio: {
                                nombre: '',
                            },
                        };
                    }
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }
    verificarPreReserva(datosPreReserva: VerificarPreReservaBody) {
        this.datosPreReserva = [];
        this.preReservaService.verificarPreReserva(datosPreReserva).subscribe(
            (data) => {
                if (data !== null) {
                    if (data.code! == 203) {
                        this.dialog = {
                            color: 'red',
                            icon : 'pi pi-times-circle',
                            title: 'Error en verificacion pre-reserva',
                            message: data.msg!,
                            visible: true
                        }
                    } else {
                        console.log(data.precioServicio)
                        this.datosPreReserva.push({
                            id:this.cabaniaSeleccionada.id,
                            servicio:this.cabaniaSeleccionada.nombre,
                            numNoche: data.numNoches,
                            precio: data.precioServicio,
                            total:data.totalReserva,
                            impuesto:data.impuesto,
                            totalDescuento:data.totalReservaConDescuento,
                            desde:this.fechaSeleccionada[0].toISOString().substring(0, 10),
                            hasta:this.fechaSeleccionada[1].toISOString().substring(0, 10),
                        })
                        this.visibleInfoReserva = false;
                        this.visibleDetalleReserva = true;
                    }
                } else {
                }
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }
    crearPreReserva(datosReserva: DatosReservaBody){
        this.datosPreReserva = [];
        this.preReservaService.crearPreReserva(datosReserva).subscribe(
            (data) => {
                if (data !== null) {
                    if (data.code! == 203) {
                        this.dialog = {
                            color: 'red',
                            icon : 'pi pi-times-circle',
                            title: 'Crear pre-reserva',
                            message: data.msg!,
                            visible: true
                        }
                    } else {
                        this.dialog = {
                            color: 'green',
                            icon : 'pi pi-check-circle',
                            title: 'Crear pre-reserva',
                            message: `La reserva con codigo ${data.reserva.CodigoReserva} , se ha creado con exito `,
                            visible: true
                        }
                        this.limpiarDatos();
                    }
                } else {
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
                            iniciales: parque.iniciales
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
    getCabanias() {
        this.serviciosParqueService
            .getCabañasParque(this.parqueSeleccionado.id,this.tiposServicioSeleccionada.id)
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
        this.todosLosDias = { date: [], tipo: [] };
        const man = this.mantenimientoService
            .getManteReservByServicioParque(idServicioParque)
            .subscribe(
                (data) => {
                    console.log(data)
                    data.mantenimiento!.forEach((rango) => {
                        const fechaInicio = new Date(rango.fechaInicio!);
                        fechaInicio.setDate(fechaInicio.getDate() + 1);
                        const fechaFin = new Date(rango.fechaFin!);
                        fechaFin.setDate(fechaFin.getDate() + 1);
                        const fechasEntreRango = this.getFechasEntreRango(
                            fechaInicio,
                            fechaFin,
                            'Mantenimiento'
                        );
                        this.todosLosDias.date.push(...fechasEntreRango.date);
                        this.todosLosDias.tipo.push(...fechasEntreRango.tipo);
                    });
                    data.reserva!.forEach((rango) => {
                        const fechaInicio = new Date(rango.fechaInicio!);
                        fechaInicio.setDate(fechaInicio.getDate() + 1);
                        const fechaFin = new Date(rango.fechaFin!);
                        fechaFin.setDate(fechaFin.getDate() + 1);
                        const fechasEntreRango = this.getFechasEntreRango(
                            fechaInicio,
                            fechaFin,
                            'Reserva'
                        );
                        this.todosLosDias.date.push(...fechasEntreRango.date);
                        this.todosLosDias.tipo.push(...fechasEntreRango.tipo);
                    });
                    data.preReserva!.forEach((rango) => {
                        const fechaInicio = new Date(rango.fechaInicio!);
                        fechaInicio.setDate(fechaInicio.getDate() + 1);
                        const fechaFin = new Date(rango.fechaFin!);
                        fechaFin.setDate(fechaFin.getDate() + 1);
                        const fechasEntreRango = this.getFechasEntreRango(
                            fechaInicio,
                            fechaFin,
                            'PreReserva'
                        );
                        this.todosLosDias.date.push(...fechasEntreRango.date);
                        this.todosLosDias.tipo.push(...fechasEntreRango.tipo);
                    });
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }
    getFechasEntreRango(
        fechaInicial: Date,
        fechaFinal: Date,
        tipo: string
    ): DiasReservaMantenimiento {
        const fechas = [];
        const tipos = [];
        const fechaTemp = new Date(fechaInicial);
        if(tipo === 'Mantenimiento' ){
            while (fechaTemp <= fechaFinal) {
                fechas.push(new Date(fechaTemp));
                tipos.push(tipo);
                fechaTemp.setDate(fechaTemp.getDate() + 1);
            }
        }else{
            while (fechaTemp < fechaFinal) {
                fechas.push(new Date(fechaTemp));
                tipos.push(tipo);
                fechaTemp.setDate(fechaTemp.getDate() + 1);
            }
        }
        return {
            date: fechas,
            tipo: tipos,
        };
    }
    onClickAddService() {
        if(this.validarFormulario()){
            if (
                this.usuario.documento &&
                this.usuario.nombreCompleto &&
                this.usuario.correo &&
                this.usuario.telefono &&
                this.usuario.direccion &&
                this.usuario.tipoContrato &&
                this.datosReserva.numMascotas! >= 0 &&
                this.datosReserva.numPersonas! > 0
            ) {
                if(this.fechaSeleccionada){
                    if (this.fechaSeleccionada[0] && this.fechaSeleccionada[1]) {
                        const datosVerificarPreReserva: VerificarPreReservaBody = {
                            idServicioParque: this.cabaniaSeleccionada.id,
                            fechaInicio: this.fechaSeleccionada[0]
                                .toISOString()
                                .substring(0, 10),
                            fechaFin: this.fechaSeleccionada[1]
                                .toISOString()
                                .substring(0, 10),
                            nocheGratis: this.valNocheGratis == 'ng' ? true : false,
                            reservaDescuento:
                                this.valReservaDescuento == 'rd' ? true : false,
                            numPersonas: this.datosReserva.numPersonas,
                            numMascotas: this.datosReserva.numMascotas,
                            documento: this.usuario.documento,
                        };

                        this.verificarPreReserva(datosVerificarPreReserva);
                    } else {
                        this.dialog = {
                            color: 'red',
                            icon : 'pi pi-times-circle',
                            title: 'Error en rango de fechas',
                            message: 'Señor usuario debe seleccionar un rango de fechas.',
                            visible: true
                        }
                    }
                }
                else{
                    this.dialog = {
                        color: 'red',
                        icon : 'pi pi-times-circle',
                        title: 'Error seleccionar fecha',
                        message: 'Señor usuario debe seleccionar un rango de fechas.',
                        visible: true
                    }
                }

            } else {
                this.dialog = {
                    color: 'red',
                    icon : 'pi pi-times-circle',
                    title: 'Error en formulario',
                    message: 'Señor usuario debe ingresar la información solicitada en el formulario.',
                    visible: true
                }
            }
        }
    }
    onClickConfirmReservation(){
        const datosBody: DatosReservaBody = {
            ...this.datosReserva,
            nocheGratis: this.valNocheGratis == 'ng' ? true : false,
            reservaDescuento: this.valReservaDescuento == 'rd' ? true : false,
            idServicioParque: this.cabaniaSeleccionada.id,
            idMunicipio: this.municipiosSeleccionado?.id,
            fechaInicio: this.fechaSeleccionada[0]
            .toISOString()
            .substring(0, 10),
            fechaFin: this.fechaSeleccionada[1]
            .toISOString()
            .substring(0, 10),
            documento:this.usuario.documento,
            nombreCompleto:this.usuario.nombreCompleto,
            correo:this.usuario.correo,
            telefono:this.usuario.telefono,
            celular:this.usuario.celular,
            inicialesParque:this.parqueSeleccionado.iniciales,
            direccion:this.usuario.documento
        }
        this.crearPreReserva(datosBody);
    }
    onDropdownChangeParque(event: any) {
        this.tiposServicioSeleccionada = {};
    }
    onDropdownChangeCabania(event: any) {
        this.getFechasReservaPorServicioParque(this.cabaniaSeleccionada.id);
    }
    onDropdownChangeTipoServicio(event: any) {
        this.cabaniaSeleccionada = {};
        this.getCabanias();
    }
    blurDocument(event: Event) {
        this.getUserByDocument();
    }
    validarFormulario(): boolean {
        let isValid = true;
        if (this.datosReserva.numMascotas === undefined || this.datosReserva.numMascotas < 0) {
            this.formulario.form.controls['numMascotas'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (this.datosReserva.numMenoresEdad === undefined || this.datosReserva.numMenoresEdad < 0) {
            this.formulario.form.controls['numMenoresEdad'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (!this.datosReserva.numPersonas || this.datosReserva.numPersonas < 0) {
            this.formulario.form.controls['numPersona'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (
            !this.usuario.documento ||
            this.usuario.documento.toString().length > 10
        ) {
            this.formulario.form.controls['documento'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (
            !this.usuario.nombreCompleto ||
            this.usuario.nombreCompleto.trim() === ''
        ) {
            this.formulario.form.controls['nombre'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (!this.usuario.correo || !this.validarCorreo(this.usuario.correo)) {
            this.formulario.form.controls['correo'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (
            !this.usuario.celular ||
            this.usuario.celular.toString().length > 10
        ) {
            this.formulario.form.controls['celular'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (
            !this.usuario.telefono ||
            this.usuario.telefono.toString().length !== 10
        ) {
            this.formulario.form.controls['telefono'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (
            !this.municipiosSeleccionado! ||
            !this.municipiosSeleccionado!.nombre ||
            this.municipiosSeleccionado!.nombre.trim() === ''
        ) {
            this.formulario.form.controls['municipio'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }

        if (!this.usuario.direccion || this.usuario.direccion.trim() === '') {
            this.formulario.form.controls['direccion'].setErrors({
                incorrect: true,
            });
            isValid = false;
        }
        return isValid;
    }
    validarCorreo(correo: string): boolean {
        const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regexCorreo.test(correo);
    }
    tieneError(controlName: string, errorName: string): boolean {
        const control = this.formulario?.form.controls[controlName];
        return control?.hasError(errorName) || false;
    }
    dateIsInListMantenimiento(date: any): boolean {
        return this.todosLosDias.date.some((fecha, index) => {
            if (this.todosLosDias.tipo[index] == 'Mantenimiento') {
                return (
                    date.day === fecha.getDate() &&
                    date.month == fecha.getMonth() &&
                    date.year === fecha.getFullYear()
                );
            } else {
                return false;
            }
        });
    }
    dateIsInListPreReserva(date: any): boolean {
        return this.todosLosDias.date.some((fecha, index) => {
            if (this.todosLosDias.tipo[index] == 'PreReserva') {
                return (
                    date.day === fecha.getDate() &&
                    date.month == fecha.getMonth() &&
                    date.year === fecha.getFullYear()
                );
            } else {
                return false;
            }
        });
    }
    dateIsInListReserva(date: any): boolean {
        return this.todosLosDias.date.some((fecha, index) => {
            if (this.todosLosDias.tipo[index] == 'Reserva') {
                return (
                    date.day === fecha.getDate() &&
                    date.month == fecha.getMonth() &&
                    date.year === fecha.getFullYear()
                );
            } else {
                return false;
            }
        });
    }
    limpiarDatos(){
        this.usuario = {
            tipoContrato: {
                id: 0,
                tipo: '',
            },
            Municipio: {
                nombre: '',
            },
        };

        this.datosPreReserva = [];
        this.datosReserva = {};
        this.visibleInfoReserva = true;
        this.visibleDetalleReserva = false;
        this.parqueSeleccionado = {};
        this.cabaniaSeleccionada = {};
        this.fechaSeleccionada = []
    }
}
