import { Municipio } from "./municipios.model";

export interface Parques{
    id?:number,
    idMunicipio?:number,
    nombre?:string,
    iniciales?:string,
    direccion?:string,
    telefono?:number,
    observacion?:string,
    urlImagenBoton?:string,
    urlYoutube?:string,
    urlImagen?:string,
    activo?:boolean,
    latitud?:number,
    longitud?:number,
    Municipio?:Municipio,
    imgBase64?:string,
    imgBotonBase64?:string,
}

