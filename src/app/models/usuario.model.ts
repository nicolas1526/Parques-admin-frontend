import { Municipio } from "./municipios.model";

export interface TipoContrato{
    id?:number,
    tipo?:string
}

export interface Rol{
    id?:number,
    urlImagen?:string,
    nombre?:string,
    estado?:boolean,
    imgBase64?:string
}

export interface Usuario{
    id?:number,
    documento?:string,
    nombreCompleto?:string,
    correo?:string,
    login?:string,
    telefono?:string,
    numAccesos?:number,
    celular?:string,
    idMunicipio?:number,
    direccion?:string,
    numNocheDescuento?:number,
    numNocheGratis?:number,
    fechaActivoHasta?:Date,
    fechaUltimoAcceso?:Date,
    Roles?:Rol[],
    Municipio?:Municipio,
    tipoContrato?:TipoContrato
}

