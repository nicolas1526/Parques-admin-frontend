import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Horario } from '../models/horario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  constructor(private http: HttpClient) { }

  getHorarios(): Observable<Horario[]> {
    const url = `${API_URL}/horarios`;
    return this.http.get<Horario[]>(url);
  }
  createHorario(Horario: Horario): Observable<Horario> {
    const url = `${API_URL}/horarios`;
    return this.http.post<Horario>(url, Horario);
  }
  deleteHorario(idHorario: number): Observable<void> {
    const url = `${API_URL}/horarios/${idHorario}`;
    return this.http.delete<void>(url);
  }

  updateHorario(
    Horario: Horario
  ): Observable<Horario> {
    const url = `${API_URL}/horarios/${Horario.id}`;
    return this.http.put<Horario>(url, Horario);
  }
}
