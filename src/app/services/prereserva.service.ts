import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { DatosReservaBody, VerificarPreReservaBody, VerificarPreReservaRes } from '../models/verificar-prereserva';

@Injectable({
  providedIn: 'root'
})
export class PrereservaService {

    constructor(private http: HttpClient) {}

   /* getParques(): Observable<VerificarPreReservaRes[]> {
        const url = `${API_URL}/parque`;
        return this.http.get<Parques[]>(url);
    }*/

    verificarPreReserva(datosPreReserva: VerificarPreReservaBody): Observable<VerificarPreReservaRes> {
        const url = `${API_URL}/prereserva/verificar-prereserva`;
        return this.http.post<VerificarPreReservaRes>(url, datosPreReserva);
    }

    crearPreReserva(datosPreReserva: DatosReservaBody): Observable<VerificarPreReservaRes> {
        const url = `${API_URL}/prereserva/crear-prereserva`;
        return this.http.post<VerificarPreReservaRes>(url, datosPreReserva);
    }

    /*deleteParque(idParque: number): Observable<void> {
        const url = `${API_URL}/parque/${idParque}`;
        return this.http.delete<void>(url);
    }

    updateParque(parque: Parques): Observable<Parques> {
        const url = `${API_URL}/parque/${parque.id}`;
        return this.http.put<Parques>(url, parque);
    }*/
}
