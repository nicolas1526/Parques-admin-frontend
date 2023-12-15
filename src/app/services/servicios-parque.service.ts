import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, ID_CABAÑA } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { ServicioParque } from '../models/servicio';
@Injectable({
  providedIn: 'root'
})
export class ServiciosParqueService {

  constructor(private http: HttpClient) { }

  getServiciosParque():Observable<ServicioParque[]>{
    const url = `${API_URL}/servicio-parques`;
    return this.http.get<ServicioParque[]>(url);
  }

  getCabañasParque(idParque: number | undefined,idTipoServicio: number | undefined):Observable<ServicioParque[]>{
    const url = `${API_URL}/servicio-parques/parque/${idParque}/tipo-servicio/${idTipoServicio}`;
    return this.http.get<ServicioParque[]>(url);
  }

  createServiciosParque(serviciosParque:ServicioParque):Observable<ServicioParque>{
    const url = `${API_URL}/servicio-parques`;
    return this.http.post(url,serviciosParque);
  }

  deleteServiciosParque(idServicio: number): Observable<void> {
    const url = `${API_URL}/servicio-parques/${idServicio}`;
    return this.http.delete<void>(url);
  }

  updateServiciosParque(serviciosParque:ServicioParque): Observable<ServicioParque>{
    const url = `${API_URL}/servicio-parques/${serviciosParque.id}`;
    return this.http.put<ServicioParque>(url,serviciosParque);
  }

}
