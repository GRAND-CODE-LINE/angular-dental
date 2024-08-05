import { Component } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Login, LoginResponse } from 'src/app/models/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private loginservice: LoginService, private fb: FormBuilder, private router: Router) {

    this.loginForm = this.fb.group({
      username: [, Validators.compose([Validators.required])],
      password: [, Validators.required]
    })
  }

  ngOnOnit() {

  }

  async doLogin() {
    console.log(this.loginForm);
    let login: Login = this.loginForm.value;
    console.log(login);


    let res: LoginResponse = await firstValueFrom(this.loginservice.loginRequest(login));
    console.log(res);
    if (res) {
      await localStorage.setItem('username', login.username);
      await (this.loginservice.setTokenToCookies(res))
      this.router.navigateByUrl('/home/principal');
    }
  }

  test() {
    console.log(this.loginForm);
  }
}
