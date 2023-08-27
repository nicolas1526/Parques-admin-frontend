import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Parques } from '../models/parques.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ParquesService {
    constructor(private http: HttpClient) {}

    getParques(): Observable<Parques[]> {
        const url = `${API_URL}/parque`;
        return this.http.get<Parques[]>(url);
    }

    createParque(parque: Parques): Observable<Parques> {
        const url = `${API_URL}/parque`;
        return this.http.post<Parques>(url, parque);
    }

    deleteParque(idParque: number): Observable<void> {
        const url = `${API_URL}/parque/${idParque}`;
        return this.http.delete<void>(url);
    }

    updateParque(parque: Parques): Observable<Parques> {
        const url = `${API_URL}/parque/${parque.id}`;
        return this.http.put<Parques>(url, parque);
    }
}
