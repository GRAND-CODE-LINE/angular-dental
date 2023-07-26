import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itemsMenu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient){}
  recibirMenu(){
    return this.http.get<itemsMenu[]>('assets/menu/menu.json');
  }
}
