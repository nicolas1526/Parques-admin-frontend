import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { Programate } from '../models/programate.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramateService {

    constructor(private http: HttpClient) {}

    getProgramate(): Observable<Programate[]> {
        const url = `${API_URL}/programate`;
        return this.http.get<Programate[]>(url);
    }

    createProgramate(programate: Programate): Observable<Programate> {
        const url = `${API_URL}/programate`;
        return this.http.post<Programate>(url, programate);
    }

    deleteProgramate(idProgramate: number): Observable<void> {
        const url = `${API_URL}/programate/${idProgramate}`;
        return this.http.delete<void>(url);
    }

    updateProgramate(programate: Programate): Observable<Programate> {
        const url = `${API_URL}/programate/${programate.id}`;
        return this.http.put<Programate>(url, programate);
    }
}
