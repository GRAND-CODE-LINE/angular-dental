import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginResponse as LoginResponse } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }



  public login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://192.168.0.2:8081/api/auth/login', login)
  }


  public test(): Observable<any> {
    return this.http.get<any>('http://192.168.0.2:8081/api/test/mod')
  }
}
