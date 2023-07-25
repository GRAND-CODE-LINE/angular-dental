import { Component, OnInit } from '@angular/core';
import { itemsMenu } from 'src/app/models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  menu: itemsMenu[]=[];
  ngOnInit(){ 
  }
  
}
