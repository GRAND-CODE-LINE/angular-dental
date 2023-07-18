import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, PersonFilter } from 'src/app/models/Person';
import { Paginate_I } from 'src/app/models/utils/filter_i';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get('http://localhost:8080/person/listar')
  }
  create(person: Person) {
    return this.http.post('http://localhost:8080/person', person)
  }

  update(id: BigInteger, person: Person) {
    return this.http.put('http://localhost:8080/person/' + id, person)
  }

  delete(id: string) {
    return this.http.delete('http://localhost:8080/delete/${id}')
  }

  public paginate(filter: PersonFilter): Observable<Paginate_I> {
    return this.http.post<Paginate_I>('http://localhost:8080/person/paginate', filter)
  }

  getById(id: string) {
    return this.http.get('http://localhost:8080/person/'+id)
  }


}
