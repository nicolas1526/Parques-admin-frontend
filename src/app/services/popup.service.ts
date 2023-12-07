import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { PopUp } from '../models/popup.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

    constructor(private http: HttpClient) {}

    getPopUp(): Observable<PopUp> {
        const url = `${API_URL}/popup`;
        return this.http.get<PopUp>(url);
    }

    createPopUp(popup: PopUp): Observable<PopUp> {
        const url = `${API_URL}/popup`;
        return this.http.post<PopUp>(url, popup);
    }

    deletePopUp(idProgramate: number): Observable<void> {
        const url = `${API_URL}/popup/${idProgramate}`;
        return this.http.delete<void>(url);
    }
}
