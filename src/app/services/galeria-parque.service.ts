import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { GaleriaParque } from '../models/galeria-parque.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleriaParqueService {

  constructor(private http: HttpClient) { }

  getGaleriaParques(): Observable<GaleriaParque[]> {
    const url = `${API_URL}/archivos-galeria`;
    return this.http.get<GaleriaParque[]>(url);
  }

  deleteGaleriaParque(idGaleriaParque: number): Observable<void> {
    const url = `${API_URL}/archivos-galeria/${idGaleriaParque}`;
    return this.http.delete<void>(url);
  }

  updateGaleriaParque(GaleriaParque: GaleriaParque): Observable<GaleriaParque> {
    const url = `${API_URL}/archivos-galeria/${GaleriaParque.id}`;
    return this.http.put<GaleriaParque>(url, GaleriaParque);
  }

  createGaleriaParque(GaleriaParque: GaleriaParque): Observable<GaleriaParque> {
    const url = `${API_URL}/archivos-galeria`;
    return this.http.post(url, GaleriaParque);
  }
}