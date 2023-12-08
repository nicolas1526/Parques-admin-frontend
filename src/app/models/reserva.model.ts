export interface EstadoReserva{
    EstadoReservaId?:number,
    NombreEstadoReserva?:string
}

interface Usuario{
    correo?:string,
    documento?:string,
    nombreCompleto?:string,
    telefono?:string,
}

export interface Reserva{
    ReservaId:number,
    CodigoReserva:string,
    PrecioTotalReserva:number,
    FechaGeneracionReserva:string,
    UsuarioCreacion:string,
    estadoreserva:EstadoReserva,
    Usuario:Usuario,
}