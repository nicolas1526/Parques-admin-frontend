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
    totalReserva?:number,
    totalReservaConDescuento?:number,
    code?:number,
    msg?:string
}


export interface DatosPreReserva{
    id?:number,
    servicio?:string,
    numNoche?:number,
    precio?:number,
    impuesto?:number,
    total?:number,
    totalDescuento?:number,
    desde?:string,
    hasta?:string
}

export interface DatosReservaBody{
    idServicioParque?:number,
    idMunicipio?:number,
    fechaInicio?:string,
    fechaFin?:string,
    documento?:string,
    nombreCompleto?:string,
    correo?:string,
    telefono?:string,
    celular?:string,
    inicialesParque?:string,
    numPersonas?:number,
    numMascotas?:number,
    numMenoresEdad?:number,
    nocheGratis?:boolean,
    reservaDescuento?:boolean,
    direccion?:string


}
