import { Parques } from "./parques.model"

export interface Horario{
    id?:number,
    horaEntradaParque?:string,
    horaSalidaParque?:string,
    checkinAlojamiento?:string,
    checkoutAlojamiento?:string,
    horarioCampin?:string,
    horarioRelatoria?:string
    horarioBicicar?:string,
    Parque?:Parques,
    idParque?:number
}

