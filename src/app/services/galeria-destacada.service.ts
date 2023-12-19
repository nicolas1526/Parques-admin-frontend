import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { GaleriaDestacada } from '../models/galeria-parque.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleriaDestacadaService {

    constructor(private http: HttpClient) { }

    getGaleriaDestacadas(): Observable<GaleriaDestacada[]> {
      const url = `${API_URL}/galeria-destacada`;
      return this.http.get<GaleriaDestacada[]>(url);
    }

    deleteGaleriaDestacada(idGaleriaDestacada: number): Observable<void> {
      const url = `${API_URL}/galeria-destacada/${idGaleriaDestacada}`;
      return this.http.delete<void>(url);
    }

    updateGaleriaDestacada(galeriaDestacada: GaleriaDestacada): Observable<GaleriaDestacada> {
      const url = `${API_URL}/galeria-destacada/${galeriaDestacada.id}`;
      return this.http.put<GaleriaDestacada>(url, galeriaDestacada);
    }

    createGaleriaDestacada(galeriaDestacada: GaleriaDestacada): Observable<GaleriaDestacada> {
      const url = `${API_URL}/galeria-destacada`;
      return this.http.post(url, galeriaDestacada);
    }
}
