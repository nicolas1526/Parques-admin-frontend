import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { Abonos, Reserva, ReservaDetalle } from '../models/reserva.model';

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

  deleteReservaById(idReserva:string): Observable<void> {
    const url = `${API_URL}/reservas/${idReserva}`;
    return this.http.delete<void>(url);
  }

  getAllAbonoReservasByReserva(idReserva: string): Observable<Abonos[]> {
    const url = `${API_URL}/abonos/reserva/${idReserva}`;
    return this.http.get<Abonos[]>(url);
  }

  createAbonoReserva(abono: Abonos): Observable<Abonos> {
    const url = `${API_URL}/abonos/`;
    return this.http.post<Abonos>(url,abono);
  }
  
  deleteAbonoReserva(idAbono: number): Observable<void> {
    const url = `${API_URL}/abonos/${idAbono}`;
    return this.http.delete<void>(url);
  }
  
}
