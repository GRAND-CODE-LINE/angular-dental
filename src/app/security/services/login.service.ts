import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, LoginResponse as LoginResponse } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {
    window.addEventListener('storage', this.handleStorageChange.bind(this));
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
  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'minita_user') {
      this.isAuthenticatedSubject.next(this.checkAuthStatus());
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
    this.isAuthenticatedSubject.next(false);
    this.router.navigateByUrl('');
  }

  async logIn(user: any) {
    await localStorage.setItem('minita_user', JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
    console.log('guarda');
    this.isAuthenticatedSubject.next(true)
    this.router.navigateByUrl('/home/principal');
    setTimeout(() => {
      this.isAuthenticatedSubject.next(true);
    }, 100);
  }

  isLogged() {
    return !!localStorage.getItem("minita_user");
  }


}
