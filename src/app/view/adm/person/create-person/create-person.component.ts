import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Person, itemsType } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss'],
})
export class CreatePersonComponent implements OnInit, OnDestroy, OnChanges {
  person!: Person;
  personform!: FormGroup;
  modoEditar = false;
  documentType!: Observable<itemsType[]>;
  constructor(
    private service: PersonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.documentType = this.getDocumentType();
    this.personform = this.fb.group({
      id: [],
      nombre: [null, Validators.compose([Validators.required])],
      apaterno: [null, Validators.compose([Validators.required])],
      amaterno: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([])],
      telefono: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      tipoDocumento: [null, Validators.compose([Validators.required])],
      numeroDocumento: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(8)]),
      ],
      fechaNacimiento: [null, Validators.compose([Validators.required])],
      genero: [null, Validators.compose([Validators.required])],
    });
    if (this.route.snapshot.params['id'] != undefined) {
      this.modoEditar = true;
      const id = this.route.snapshot.paramMap.get('id')!;
      this.service.getById(id).subscribe((data: any) => this.Llenar(data));
    }
  }
  getDocumentType() {
    return this.http.get<itemsType[]>('assets/Documents/Documents.json');
  }
  create() {
    if (!this.modoEditar) {
      this.person = this.personform.value;
      this.service
        .create(this.person)
        .subscribe((data: any) => (this.person = data));
    } else {
      this.person = this.personform.value;
      this.service
        .update(this.person.id, this.person)
        .subscribe((data: any) => (this.person = data));
    }
  }
  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  Llenar(data: Person) {
    console.log('XD');
    
    data.fechaNacimiento?.setDate(data.fechaNacimiento?.getDate() + 1);
    this.personform.patchValue(data);
  }
}
