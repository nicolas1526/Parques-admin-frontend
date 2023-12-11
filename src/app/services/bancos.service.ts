import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Departamento } from '../models/departamento.model';
import { Observable } from 'rxjs';
import { Banco } from '../models/banco.model';
@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient) { }

  getBancos():Observable<Banco[]>{
    const url = `${API_URL}/banco`;
    return this.http.get<Banco[]>(url);
  }

  createBanco(banco:Banco):Observable<Banco>{
    const url = `${API_URL}/banco`;
    return this.http.post<Banco>(url,banco);
  }

  deleteBanco(idBanco: number): Observable<void> {
    const url = `${API_URL}/banco/${idBanco}`;
    return this.http.delete<void>(url);
  }

  updateBanco(banco:Banco): Observable<Banco>{
    const url = `${API_URL}/banco/${banco.id}`;
    return this.http.put<Banco>(url,banco);
  }

  

}
