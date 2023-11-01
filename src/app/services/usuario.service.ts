import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) {}

    getUsuarios(): Observable<Usuario[]> {
        const url = `${API_URL}/usuario`;
        return this.http.get<Usuario[]>(url);
    }

    getUsuarioPorDocumento(numDocumento: string): Observable<Usuario> {
        const url = `${API_URL}/usuario/documento/${numDocumento}`;
        return this.http.get<Usuario>(url);
    }
/*
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
    }*/
}
