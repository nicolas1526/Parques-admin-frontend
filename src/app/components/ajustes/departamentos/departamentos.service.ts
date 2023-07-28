import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Departamento } from '../../models/departamento';
import { Observable } from 'rxjs';
import { url } from 'inspector';
@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(private http: HttpClient) { }

  getDepartamentos():Observable<Departamento[]>{
    const url = `${API_URL}/departamento`;
    return this.http.get<Departamento[]>(url);
  }

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
  }

}
