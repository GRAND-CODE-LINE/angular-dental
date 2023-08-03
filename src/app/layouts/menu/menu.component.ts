import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { itemsMenu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  menuPrincipal!: Observable<itemsMenu[]>;

  constructor(private servicio :MenuService){}
  

  ngOnInit(){   
    this.menuPrincipal=this.servicio.recibirMenu();
  }
  
}
