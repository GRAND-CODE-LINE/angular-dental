import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { MessagesService } from 'src/app/layouts/services/messages.service';
import { itemsType } from 'src/app/models/Person';
import { Patient } from 'src/app/models/patient';
import { Message_I } from 'src/app/models/utils/message_i';
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
  documentType!: Observable<itemsType[]>;
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

  // documentTypePerson = [
  //   { value: 'null', label: 'Tipo Domunento' },
  //   { value: 'DNI', label: 'Documento de identidad' },
  //   { value: 'PASAPORTE', label: 'Pasaporte' },
  //   { value: 'CARNET DE EXTRANJERIA', label: 'Carnet Extrangeria' },
  // ];

  constructor(
    private service: PatientService,
    private personService: PersonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private messageService: MessagesService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  getDocumentType() {
    return this.http.get<itemsType[]>('assets/Documents/Documents.json');
  }

  ngOnInit(): void {
    this.documentType = this.getDocumentType();
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
      genero: [null, Validators.compose([Validators.required])],
    });
    this.patientform = this.fb.group({
      id: [],
      redSocial: [],
      contactoEmergencia: [null, Validators.compose([Validators.required])],
      numeroEmergencia: [null, Validators.compose([Validators.required])],
      peso: [],
      talla: [],
    });
    if (this.route.snapshot.params['id'] != undefined) {
      this.modoEditar = true;
      const id = this.route.snapshot.paramMap.get('id')!;
      this.service.getById(id).subscribe((data: any) => this.Llenar(data));
    }
  }
  async create() {
    if (!this.patientform.valid || !this.personform.valid) {
      let message: Message_I = {
        title: 'Falta llenar datos',
        message: 'complete todos los campos con asteriscos',
        type: 'danger',
      };
      this.messageService.openModal(message);
      return;
    }
    if (!this.modoEditar) {
      this.crearPatient();
      await firstValueFrom(this.service.create(this.patient));
    } else {
      this.crearPatient();
      await firstValueFrom(this.service.update(this.patient.id, this.patient));
    }
    this.router.navigateByUrl('control/patient');
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
    this.listAlergias = data.alergias;
    this.listEnfermedades = data.enfermedades;
    // Supongamos que 'fechaSinFormato' es tu fecha sin formato
    let fechaFormateada = this.datePipe.transform(
      data.persona.fechaNacimiento,
      'yyyy-MM-dd'
    );

    // Asigna la fecha formateada al control del formulario
    this.personform.patchValue({
      fechaNacimiento: fechaFormateada,
    });
  }

  crearPatient() {
    this.patient = this.patientform.value;
    this.patient.alergias = this.listAlergias;
    this.patient.enfermedades = this.listEnfermedades;
    this.patient.fotoPermiso = this.captureImage;
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
    this.modalService.hide();
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage!.imageAsDataUrl;
    console.log(this.captureImage);
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
