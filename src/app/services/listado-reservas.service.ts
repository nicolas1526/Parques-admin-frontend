import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { Reserva, ReservaDetalle } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ListadoReservasService {

  constructor(private http: HttpClient) { }

  getAllReservasByEstado(idEstado: number): Observable<Reserva[]> {
    const url = `${API_URL}/reservas/estado/${idEstado}`;
    return this.http.get<Reserva[]>(url);
  }
  getReservasById(idReserva: string): Observable<ReservaDetalle> {
    const url = `${API_URL}/reservas/${idReserva}`;
    return this.http.get<ReservaDetalle>(url);
  }
}
