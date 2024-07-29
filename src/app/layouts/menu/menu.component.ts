import { ChangeDetectorRef, Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { itemsMenu } from 'src/app/models/menu';
import { LoginService } from 'src/app/security/services/login.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
  menuPrincipal!: Observable<any[]>;
  public isAuthenticated: boolean = false;
  constructor(
    private servicio: MenuService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.menuPrincipal = this.servicio.recibirMenu();
  }

  logOut() {
    this.loginService.logOut();
  }
  ngOnChanges() {
    console.log('Changes');
    console.log(this.isAuthenticated);
  }
}
