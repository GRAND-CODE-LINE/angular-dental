import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { PersonServiceService } from 'src/app/services/person/person-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy, OnChanges {
  persons: any[] = [];
  person={
    nombre:'',
    apaterno :'',
      amaterno:'',
    email: '',
    tipoDocumento: '',
    numeroDocumento : null,
    fechaNacimiento: null
  }

  constructor(
    private service: PersonServiceService
  ) { }

  ngOnInit(): void {
   this.getAll;
  }

  getAll(){
    this.service.getAll()
    .subscribe((data: any) => this.persons = data);
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }
}
