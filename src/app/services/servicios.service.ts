import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  getServicios():Observable<Servicio[]>{
    const url = `${API_URL}/servicio`;
    return this.http.get<Servicio[]>(url);
  }

  createServicio(servicio:Servicio):Observable<Servicio>{
    const url = `${API_URL}/servicio`;
    return this.http.post(url,servicio);
  }

  deleteServicio(idServicio: number): Observable<void> {
    const url = `${API_URL}/servicio/${idServicio}`;
    return this.http.delete<void>(url);
  }

  updateDepartamento(servicio:Servicio): Observable<Servicio>{
    const url = `${API_URL}/servicio/${servicio.id}`;
    return this.http.put<Servicio>(url,servicio);
  }

}
