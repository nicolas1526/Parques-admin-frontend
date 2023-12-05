export interface VerificarPreReservaBody{
    idServicioParque?:number,
    fechaInicio?:string,
    fechaFin?:string,
    numPersonas?:number,
    numMascotas?:number
}

export interface VerificarPreReservaRes{
    numNoches?:number,
    precioServicio?:number,
    impuesto?:number,
    totalServicio?:number,
    code?:number,
    msg?:string
}
