import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImgBBService {

  private apiUrl = `https://api.imgbb.com/1/upload?key=${environment.imgbbKey}`;

  constructor(private http: HttpClient) {}

  subirImagen(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(this.apiUrl, formData);
  }
}
