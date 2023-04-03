import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy, OnChanges {

  tasks=[{id:1,nombre:"carlos"},{id:2,nombre:"Eduardo"},{id:3,nombre:"romel"},{id:4,nombre:"ruben"}];

  ngOnInit() {
    console.log('Init');
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }
}
