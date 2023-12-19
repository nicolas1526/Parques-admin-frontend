
import { Parques } from "./parques.model"

export interface GaleriaParque extends GaleriaDestacada{
    Parque?:Parques,
    idParque?:number,
}

export interface GaleriaDestacada{
    id?:number,
    urlImagen?:string,
    titulo?:string,
    estado?:boolean,
    imgBase64?:string
}
