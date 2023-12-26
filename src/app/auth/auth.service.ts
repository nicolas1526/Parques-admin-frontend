import { Injectable } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants/app.constants';
import { Rol } from '../models/usuario.model';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {

  constructor(private http: HttpClient) { }

  getUsuario(token:string){
    const url = `${API_URL}/auth/login`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = { headers: headers };
    return this.http.get<Rol[]>(url, options);
  }
}
