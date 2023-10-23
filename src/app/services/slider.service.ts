import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { Slider } from '../models/slider.model';
@Injectable({
  providedIn: 'root'
})
export class SliderService {

    constructor(private http: HttpClient) { }

    getSliders():Observable<Slider[]>{
      const url = `${API_URL}/archivo-slider`;
      return this.http.get<Slider[]>(url);
    }

    createSlider(slider:Slider):Observable<Slider>{
      const url = `${API_URL}/archivo-slider`;
      return this.http.post(url,slider);
    }

    deleteSlider(idSlider: number): Observable<void> {
      const url = `${API_URL}/archivo-slider/${idSlider}`;
      return this.http.delete<void>(url);
    }

    updateSlider(slider:Slider): Observable<Slider>{
      const url = `${API_URL}/archivo-slider/${slider.id}`;
      return this.http.put<Slider>(url,slider);
    }
}
