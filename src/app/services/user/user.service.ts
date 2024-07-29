import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserFilter } from 'src/app/models/user';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { UserRepresentation_I } from 'src/app/models/utils/User_Representation_K';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  URL_BASE = environment.URL_SECURITY + '/keycloak/user/';

  public paginate(filter: UserFilter): Observable<Paginate_I> {
    return this.http.post<Paginate_I>(this.URL_BASE + 'search', filter)
  }

  create(user: User) {
    return this.http.post(this.URL_BASE + 'create', user)
  }

  update(id?: string, user?: User) {
    return this.http.put(this.URL_BASE + 'update/' + id, user)
  }

  delete(username?: string) {
    return this.http.delete(this.URL_BASE + 'delete/' + username)
  }

  getByUsername(username: string) {
    return this.http.get(this.URL_BASE + 'search/' + username)
  }
}