import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, LoginResponse as LoginResponse } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient, private router: Router) {
  }


  private checkAuthStatus(): boolean {
    const authToken = localStorage.getItem('minita_user');
    if (authToken) {
      console.log('tiene localStorage');

      return true
    } else {
      console.log('no tiene localStorage');
      return false
    }
  }


  public loginRequest(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8081/api/auth/login', login)
  }


  public test(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/api/test/mod')
  }


  logOut() {
    localStorage.clear();

    this.router.navigateByUrl('');
  }

  async logIn(user: any) {
    await localStorage.setItem('minita_user', JSON.stringify(user));

    console.log('guarda');

    this.router.navigateByUrl('/home/principal');
    setTimeout(() => {

    }, 100);
  }

  isLogged() {
    return !!localStorage.getItem("minita_user");
  }


}
