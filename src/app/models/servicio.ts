export interface Servicio {
    id?: number;
    idTipoServicio?: number;
    nombre?: string;
    descripcion?: string;
    codigoTesoreria?: string;
    codigoContabilidad?: string;
    activo?: boolean;
    TipoServicio?: TipoServicio;
}

export interface TipoServicio {
    id?: number;
    urlIcono?: string|undefined;
    nombre?: string;
    descripcion?: string;
    imgBase64?: string|undefined;
}
