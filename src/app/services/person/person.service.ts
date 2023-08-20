import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, PersonFilter } from 'src/app/models/person';
import { Paginate_I } from 'src/app/models/utils/filter_i';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get('http://localhost:8080/person/listar')
  }
  create(person?: Person) {
    return this.http.post('http://localhost:8080/person', person)
  }

  update(id?: String, person?: Person) {
    return this.http.put('http://localhost:8080/person/' + id, person)
  }

  delete(id?: string) {
    return this.http.delete('http://localhost:8080/person/'+id)
  }

  public paginate(filter: PersonFilter): Observable<Paginate_I> {
    return this.http.post<Paginate_I>('http://localhost:8080/person/paginate', filter)
  }

  getByDocument(document: string) {
    return this.http.get('http://localhost:8080/person/getByDocument/' + document)
  }

  getById(id: string) {
    return this.http.get('http://localhost:8080/person/' + id)
  }


}
