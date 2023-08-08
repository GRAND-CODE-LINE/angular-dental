import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PatientFilter } from 'src/app/models/Patient';
import { Paginate_I } from 'src/app/models/utils/filter_i';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get('http://localhost:8080/patient/listar')
  }
  create(patient: Patient) {
    return this.http.post('http://localhost:8080/patient', patient)
  }

  update(id?: String, patient?: Patient) {
    return this.http.put('http://localhost:8080/patient/' + id, patient)
  }

  delete(id?: string) {
    return this.http.delete('http://localhost:8080/patient/' + id)
  }

  public paginate(filter: PatientFilter): Observable<Paginate_I> {
    return this.http.post<Paginate_I>('http://localhost:8080/patient/paginate', filter)
  }

  getByDocument(document: string) {
    return this.http.get('http://localhost:8080/patient/getByDocument/' + document)
  }

  getById(id: string) {
    return this.http.get('http://localhost:8080/patient/' + id)
  }
}
