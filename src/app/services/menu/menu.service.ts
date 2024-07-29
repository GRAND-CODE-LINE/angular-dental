import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu, MenuFilter } from 'src/app/models/menu';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  URL_BASE = environment.URL_DENTAL + '/menu/';

  getAll() {
    return this.http.get('http://localhost:8080/menu/listar');
  }
  create(menu?: Menu) {
    return this.http.post('http://localhost:8080/menu', menu);
  }
  update(id?: String, menu?: Menu) {
    return this.http.put('http://localhost:8080/menu/' + id, menu);
  }
  delete(id?: String) {
    return this.http.delete('http://localhost:8080/menu/' + id);
  }
  public paginate(filter: MenuFilter): Observable<Paginate_I> {
    return this.http.post<Paginate_I>(
      'http://localhost:8080/menu/paginate',
      filter
    );
  }
  getById(id: String) {
    return this.http.get('http://localhost:8080/menu/' + id);
  }
}
