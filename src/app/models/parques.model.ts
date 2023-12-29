import { Municipio } from "./municipios.model";

export interface Parques{
    id?:number,
    idMunicipio?:number,
    nombre?:string,
    iniciales?:string,
    direccion?:string,
    telefono?:number,
    observacion?:string,
    descripcion?:string,
    urlYoutube?:string,
    urlImagenBoton?:string,
    urlImagen?:string,
    urlImagenMapa?:string,
    urlImagenReglamento?:string,
    activo?:boolean,
    latitud?:number,
    longitud?:number,
    Municipio?:Municipio,
    imgBase64?:string,
    imgBotonBase64?:string,
    imgMapaBase64?:string,
    imgReglamentoBase64?:string,
}

