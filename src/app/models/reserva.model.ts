import { Banco } from "./banco.model"

export interface EstadoReserva {
    EstadoReservaId?: number,
    NombreEstadoReserva?: string,
}

export interface Usuario {
    correo?: string,
    documento?: string,
    nombreCompleto?: string,
    telefono?: string,
    tipoUsuario?: string
}

interface Estado {
    nombre?: string
}

interface DetalleReserva {
    fechaInicio?: string,
    fechaFin?: string,
    numNoches?: number,
    valor?: number,
    nocheGratis?: boolean,
    reservaDescuento?: boolean,
    ServicioId?: number
}

interface ServicioParque {
    precio:number,
    impuesto?:number,
    Parque: {
        nombre?: string
    },
    Servicio: {
        nombre?: string
    }
}

export interface Reserva {
    ReservaId: number,
    CodigoReserva: string,
    PrecioTotalReserva: number,
    FechaGeneracionReserva: string,
    UsuarioCreacion: string,
    estadoreserva: EstadoReserva,
    Usuario: Usuario,
}

export interface ReservaOtro {
    ReservaId: number,
    CodigoReserva: string,
    nombreCompleto: string,
    documento: number,
    correo: string,
    telefono:number,
    NombreEstadoReserva:string,
    PrecioTotalReserva:number,
    FechaGeneracionReserva:string
}

export interface ReservaDetalle {
    codigo?:string,
    Estado?: Estado,
    Usuario?: Usuario,
    DetalleReserva?: DetalleReserva,
    ServicioParque?:ServicioParque
}


export interface Abonos {
    id?:number,
    idReserva?:number,
    idBanco?:number,
    fecha?:string,
    fechaDate?: Date,
    valor?:number,
    numeroConsignacion?:number,
    observaciones?:string,
    comprobanteUrl?:string,
    imgBase64?:string,
    Banco?:Banco
}

