import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
