import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private loginservice: LoginService) {
  }

  async test() {
    console.log('aaa');
    let res = await this.loginservice.getPerson();
    console.log(res);
  }
}
