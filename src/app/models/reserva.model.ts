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

export interface ReservaDetalle {
    codigo?:string,
    Estado?: Estado,
    Usuario?: Usuario,
    DetalleReserva?: DetalleReserva,
    ServicioParque?:ServicioParque
}


