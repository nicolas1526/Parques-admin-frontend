import { Departamento } from "./departamento.model";

export interface Municipio{
    id?:number,
    nombre?:string,
    Departamento?:Departamento,
    idDepartamento?:number
}

