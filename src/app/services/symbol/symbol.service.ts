import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Symbol, SymbolFilter } from 'src/app/models/symbol';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {


  constructor(private http: HttpClient) { }

  URL_BASE = environment.URL_DENTAL + '/symbol/';

  public paginate(filter: SymbolFilter): Observable<Paginate_I> {
    return this.http.post<Paginate_I>(this.URL_BASE + 'paginate', filter)
  }

  create(user: Symbol) {
    return this.http.post(this.URL_BASE, user)
  }

  update(id?: string, user?: Symbol) {
    return this.http.put(this.URL_BASE + id, user)
  }

  delete(id: string) {
    return this.http.delete(this.URL_BASE + id)
  }

  getById(id: string) {
    return this.http.get(this.URL_BASE + id)
  }
}
