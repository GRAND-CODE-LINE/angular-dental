import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, RoleFilter } from 'src/app/models/role';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  URL_BASE = environment.URL_SECURITY + '/keycloak/role/';

  public paginate(filter: RoleFilter): Observable<Paginate_I> {
    return this.http.post<Paginate_I>(this.URL_BASE + 'search', filter)
  }

  create(role: Role) {
    return this.http.post(this.URL_BASE + 'create', role)
  }

  update(id?: string, role?: Role) {
    return this.http.put(this.URL_BASE + 'update/' + id, role)
  }

  delete(id?: string) {
    return this.http.delete(this.URL_BASE + 'delete/' + id)
  }

  getById(id: string) {
    return this.http.get(this.URL_BASE + 'search/' + id)
  }
}

