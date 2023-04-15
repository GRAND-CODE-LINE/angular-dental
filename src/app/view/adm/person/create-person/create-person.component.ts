import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/Person';
import { PersonServiceService } from 'src/app/services/person/person-service.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})

export class CreatePersonComponent  implements OnInit, OnDestroy, OnChanges{
  person!: Person;
  personform!:FormGroup;

  constructor(
    private service: PersonServiceService,
    private fb:FormBuilder
    ) { }
    
    ngOnInit(): void {
      this.personform = this.fb.group({
        nombre:[null,Validators.compose([Validators.required])],
        apaterno: [null,Validators.compose([Validators.required])],
        amaterno: [null,Validators.compose([Validators.required])],
        direccion: [null,Validators.compose([])],
        telefono: [null,Validators.compose([Validators.required])],
        email: [null,Validators.compose([Validators.required])],
        tipoDocumento: [null,Validators.compose([Validators.required])],
        numeroDocumento:[null,Validators.compose([Validators.required,Validators.maxLength(8)])],
        fechaNacimiento: [null,Validators.compose([Validators.required])]
      })
  }

  create() {
    this.person= this.personform.value;
    this.service.create(this.person)
      .subscribe((data: any) => this.person = data);
  }
  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }
}
