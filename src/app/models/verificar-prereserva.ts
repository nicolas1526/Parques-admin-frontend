export interface VerificarPreReservaBody{
    idServicioParque?:number,
    fechaInicio?:string,
    fechaFin?:string,
    nocheGratis?:boolean,
    reservaDescuento?:boolean,
    numPersonas?:number,
    numMascotas?:number,
    documento?:string
}

export interface VerificarPreReservaRes{
    numNoches?:number,
    precioServicio?:number,
    impuesto?:number,
    totalServicio?:number,
    code?:number,
    msg?:string
}
