import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { TipoServicio } from '../models/servicio';
@Injectable({
    providedIn: 'root',
})
export class TipoServicioService {
    constructor(private http: HttpClient) {}

    getTiposDeServicios(): Observable<TipoServicio[]> {
        const url = `${API_URL}/tipo-servicio`;
        return this.http.get<TipoServicio[]>(url);
    }

    createTipoDeServicio(
        tipoDeServicio: TipoServicio
    ): Observable<TipoServicio> {
        const url = `${API_URL}/tipo-servicio`;
        return this.http.post<TipoServicio>(url, tipoDeServicio);
    }

    deleteTipoDeServicio(idTipoDeServicio: number) {
        const url = `${API_URL}/tipo-servicio/${idTipoDeServicio}`;
        return this.http.delete<void>(url);
    }

    updateTipoDeServicio(
        tipoDeServicio: TipoServicio
    ): Observable<TipoServicio> {
        tipoDeServicio.urlIcono = undefined;
        const url = `${API_URL}/tipo-servicio/${tipoDeServicio.id}`;
        return this.http.put<TipoServicio>(url, tipoDeServicio);
    }
}
