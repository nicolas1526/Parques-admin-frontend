
import { Parques } from "./parques.model"

export interface GaleriaParque{
    id?:number,
    urlImagen?:string,
    titulo?:string,
    estado?:boolean,
    Parque?:Parques,
    idParque?:number,
    imgBase64?:string
}

