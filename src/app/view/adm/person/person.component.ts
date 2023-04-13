import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { PersonServiceService } from 'src/app/services/person/person-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy, OnChanges {

  tasks=[{id:1,nombre:"carlos"},{id:2,nombre:"Eduardo"},{id:3,nombre:"romel"},{id:4,nombre:"ruben"}];
  constructor(
    private service :PersonServiceService
  ){}

  ngOnInit() {
    this.service.getAll()
    .subscribe((data:any)=>this. = data);
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }
}
