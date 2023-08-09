import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/Patient';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PersonServiceService } from 'src/app/services/person/person-service.service';

@Component({
  selector: 'app-createpatient',
  templateUrl: './createpatient.component.html',
  styleUrls: ['./createpatient.component.scss']
})
export class CreatepatientComponent implements OnInit, OnDestroy, OnChanges {
  patient!: Patient;
  personform!: FormGroup;
  patientform!: FormGroup;
  modoEditar = false;
  constructor(
    private service: PatientService,
    private personService: PersonServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.personform = this.fb.group({
      id: [],
      nombre: [null, Validators.compose([Validators.required])],
      apaterno: [null, Validators.compose([Validators.required])],
      amaterno: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([])],
      celular: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      tipoDocumento: [null, Validators.compose([Validators.required])],
      numeroDocumento: [null, Validators.compose([Validators.required, Validators.maxLength(8)])],
      fechaNacimiento: [null, Validators.compose([Validators.required])],
      genero: [null, Validators.compose([Validators.required])]
    })
    this.patientform = this.fb.group({
      id: [],
      redes: [null, Validators.compose([Validators.required])],
      contactoEmergencia: [null, Validators.compose([Validators.required])],
      numeroEmergencia: [null, Validators.compose([Validators.required])],
      alergia:[],
      enfermedades:[],
      peso: [null, Validators.compose([Validators.required])],
      talla: [null, Validators.compose([Validators.required])],

    })
    if (this.route.snapshot.params['id'] != undefined) {
      this.modoEditar = true;
      const id = this.route.snapshot.paramMap.get('id')!;
      this.service.getById(id)
        .subscribe((data: any) => this.Llenar(data));
    }
  }
  create() {
    if (!this.modoEditar) {
      this.crearPatient();
      this.service.create(this.patient)
        .subscribe((data: any) => this.patient = data);
      this.personService.create(this.patient.Persona)
        .subscribe((data: any) => this.patient = data);
    } else {
      this.crearPatient();
      this.service.update(this.patient.id, this.patient)
        .subscribe((data: any) => this.patient = data);
    }
  }
  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy patient');
  }

  Llenar(data: Patient) {
    this.patientform.patchValue(data);
  }

  crearPatient() {
    this.patient = this.patientform.value;
    this.patient.Persona = this.personform.value;
  }
}