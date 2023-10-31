import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Mantenimiento } from '../models/mantenimiento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

    constructor(private http: HttpClient) { }

    getMantenimientosByServicioParque(idServicioParque: number | undefined):Observable<Mantenimiento[]>{
      const url = `${API_URL}/servicio-mantenimiento/mantenimientoServ/${idServicioParque}`;
      return this.http.get<Mantenimiento[]>(url);
    }

    deleteMantenimiento(idMantenimiento: number): Observable<void> {
      const url = `${API_URL}/servicio-mantenimiento/${idMantenimiento}`;
      return this.http.delete<void>(url);
    }

    updateMantenimiento(mantenimiento:Mantenimiento): Observable<Mantenimiento>{
      const url = `${API_URL}/servicio-mantenimiento/${mantenimiento.MantenimientoId}`;
      return this.http.put<Mantenimiento>(url,mantenimiento);
    }

    createMantenimiento(mantenimiento:Mantenimiento):Observable<Mantenimiento>{
      const url = `${API_URL}/servicio-mantenimiento`;
      return this.http.post<Mantenimiento>(url,mantenimiento);
    }
}
