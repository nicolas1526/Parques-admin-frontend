export interface Mantenimiento{
    MantenimientoId?:number,
    ServicioId?:number,
    FechaFin:string,
    FechaInicio:string
}

export interface RangoFecha{
    fechaInicio?:string,
    fechaFin?:string
}

export interface DiasReservaMantenimiento{
    date:Date[],
    tipo:string[]
}

export interface MantenimietoReserva{
    mantenimiento?:RangoFecha[],
    reserva?:RangoFecha[],
    preReserva:RangoFecha[],
}

