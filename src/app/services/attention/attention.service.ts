import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attention } from 'src/app/models/attention';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttentionService {

  constructor(private http: HttpClient) { }
  URL_BASE = environment.URL_DENTAL + '/attention/';

  create(attention: Attention) {
    return this.http.post(this.URL_BASE, attention)
  }

  update(id?: String, attention?: Attention) {
    return this.http.put(this.URL_BASE + id, attention)
  }

  getById(id: string) {
    return this.http.get(this.URL_BASE + id)
  }

  delete(id?: string) {
    return this.http.delete(this.URL_BASE + id)
  }
}
