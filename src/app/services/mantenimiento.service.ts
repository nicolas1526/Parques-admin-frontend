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

    getDepartamentosByIdServicioParque(idServicioParque: number | undefined):Observable<Mantenimiento[]>{
      const url = `${API_URL}/servicio-mantenimiento/mantenimientoServ/${idServicioParque}`;
      return this.http.get<Mantenimiento[]>(url);
    }
    /*
    deleteDepartamento(idDepartamento: number): Observable<void> {
      const url = `${API_URL}/departamento/${idDepartamento}`;
      return this.http.delete<void>(url);
    }

    updateDepartamento(departamento:Departamento): Observable<Departamento>{
      const url = `${API_URL}/departamento/${departamento.id}`;
      return this.http.put<Departamento>(url,departamento);
    }

    createDepartamento(departamento:Departamento):Observable<Departamento>{
      const url = `${API_URL}/departamento`;
      return this.http.post(url,departamento);
    }*/
}
