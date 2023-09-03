import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from 'src/app/models/consultation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) { }

  URL_BASE = environment.URL_DENTAL + '/dental';

  searhConsultationByPatientNroDocumento(nroDocumento: string) {
    return this.http.get(this.URL_BASE + '/consultations/' + nroDocumento)
  }

  create(consultation: Consultation) {
    return this.http.post(this.URL_BASE + '/consultations/', consultation)
  }

  update(id?: String, consultation?: Consultation) {
    return this.http.put(this.URL_BASE + '/consultations/' + id, consultation)
  }

  getById(id: string) {
    return this.http.get(this.URL_BASE + '/consultationById/' + id)
  }
}
