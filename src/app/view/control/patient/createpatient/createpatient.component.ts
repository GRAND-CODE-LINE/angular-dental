import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-createpatient',
  templateUrl: './createpatient.component.html',
  styleUrls: ['./createpatient.component.scss'],
})
export class CreatepatientComponent implements OnInit, OnDestroy, OnChanges {
  modalRef?: BsModalRef;
  @ViewChild('modalActions') modalAction!: TemplateRef<any>;
  config = {
    animated: true,
    size: 'lg',
    class: 'modal-lg',
  };
  patient!: Patient;
  personform!: FormGroup;
  patientform!: FormGroup;
  modoEditar = false;
  listAlergias: string[] = [];
  listEnfermedades: string[] = [];
  alergiaAdd: string = '';
  enfermedadesAdd: string = '';
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  captureImage = '';

  constructor(
    private service: PatientService,
    private personService: PersonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

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
      numeroDocumento: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(8)]),
      ],
      fechaNacimiento: [null, Validators.compose([Validators.required])],
      genero: [],
    });
    this.patientform = this.fb.group({
      id: [],
      redSocial: [null, Validators.compose([Validators.required])],
      contactoEmergencia: [null, Validators.compose([Validators.required])],
      numeroEmergencia: [null, Validators.compose([Validators.required])],
      peso: [null, Validators.compose([Validators.required])],
      talla: [null, Validators.compose([Validators.required])],
    });
    if (this.route.snapshot.params['id'] != undefined) {
      this.modoEditar = true;
      const id = this.route.snapshot.paramMap.get('id')!;
      this.service.getById(id).subscribe((data: any) => this.Llenar(data));
    }
  }
  create() {
    if (!this.modoEditar) {
      this.patient.fotoPermiso = this.captureImage;
      this.crearPatient();
      this.service
        .create(this.patient)
        .subscribe((data: any) => (this.patient = data));
    } else {
      this.service
        .update(this.patient.id, this.patient)
        .subscribe((data: any) => (this.patient = data));
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
    this.personform.patchValue(data.persona);
  }

  crearPatient() {
    this.patient = this.patientform.value;
    this.patient.alergias = this.listAlergias;
    this.patient.enfermedades = this.listEnfermedades;
    this.patient.persona = this.personform.value;
  }
  agregarAlergia() {
    if (this.alergiaAdd.trim() != '') {
      this.listAlergias.push(this.alergiaAdd);
      this.alergiaAdd = '';
    }
  }

  eliminarAlergia(alergia: string) {
    this.listAlergias = this.listAlergias.filter((x) => {
      return x !== alergia;
    });
  }

  agregarEnfermedad() {
    if (this.enfermedadesAdd.trim() != '') {
      this.listEnfermedades.push(this.enfermedadesAdd);
      this.enfermedadesAdd = '';
    }
  }

  eliminarEnfermedad(enfermedad: string) {
    this.listEnfermedades = this.listEnfermedades.filter((x) => {
      return x !== enfermedad;
    });
  }
  public triggerSnapshot(): void {
    this.trigger.next(undefined);
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage!.imageAsDataUrl;
  }
  public get triggerObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
  onTakePhoto() {
    this.modalRef = this.modalService.show(this.modalAction, this.config);
  }
}
