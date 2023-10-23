import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Informate } from '../models/informate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformateService {
  constructor(private http: HttpClient) {}

  getInformates(): Observable<Informate[]> {
      const url = `${API_URL}/informate`;
      return this.http.get<Informate[]>(url);
  }
  createInformate(Informate: Informate): Observable<Informate> {
      const url = `${API_URL}/informate`;
      return this.http.post<Informate>(url, Informate);
  }
  deleteInformate(idInformate: number): Observable<void> {
      const url = `${API_URL}/informate/${idInformate}`;
      return this.http.delete<void>(url);
  }

  updateInformate(
      Informate: Informate
  ): Observable<Informate> {
      const url = `${API_URL}/informate/${Informate.id}`;
      return this.http.put<Informate>(url, Informate);
  }
}
