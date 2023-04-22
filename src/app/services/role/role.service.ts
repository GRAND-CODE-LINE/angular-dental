import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleFilter } from 'src/app/models/role';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  URL_BASE = environment.URL_ADM + '/role';

  public paginate(filter: RoleFilter): Observable<Paginate_I> {
    return this.http.post<Paginate_I>(this.URL_BASE + '/paginate', filter)
  }
}

