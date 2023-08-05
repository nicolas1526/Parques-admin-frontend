import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Municipio } from '../models/municipios.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MunicipiosService {
    constructor(private http: HttpClient) {}

    getMunicipios(): Observable<Municipio[]> {
        const url = `${API_URL}/municipio`;
        return this.http.get<Municipio[]>(url);
    }
    createMunicipio(municipio: Municipio): Observable<Municipio> {
        const url = `${API_URL}/municipio`;
        return this.http.post<Municipio>(url, municipio);
    }
    deleteMunicipio(idMunicipio: number): Observable<void> {
        const url = `${API_URL}/municipio/${idMunicipio}`;
        return this.http.delete<void>(url);
    }

    updateMunicipio(
        municipio: Municipio
    ): Observable<Municipio> {
        const url = `${API_URL}/municipio/${municipio.id}`;
        return this.http.put<Municipio>(url, municipio);
    }
}
