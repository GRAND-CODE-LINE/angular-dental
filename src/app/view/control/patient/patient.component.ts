import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Patient, PatientFilter } from 'src/app/models/Patient';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PersonServiceService } from 'src/app/services/person/person-service.service';
import { Paginate_T } from 'src/app/shared/mini-table/mini-table.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  patients: any[] = [];

  filter: PatientFilter;
  items: Patient[] = [];
  cols: any[] = [];

  paginateObject: Paginate_T = {
    currentPage: 0,
    size: 0,
    total: 0,
    totalpages: 0
  }
  constructor(private patientService: PatientService, private router: Router) {
    this.filter = {
      page: 0,
      size: 10,
      sortFiled: 'name',
      sortOrder: 1
    }
  }
  ngOnInit(): void {
    console.log('Init');
    this.paginateData();
    this.initCols();
  }

  initCols() {
    this.cols = [
      { name: 'ID ', field: 'id' },
      { name: 'Nombre', field: 'nombre' },
      { name: 'Apellido', field: 'apaterno' },
      { name: 'Mail', field: 'email' },
      { name: 'DNI', field: 'numeroDocumento' },
      { name: 'Fecha Nac.', field: 'fechaNacimiento' },
      { name: 'Direccion',field:'direccion'},
      { name: 'Genero',field:'genero'},
      { name: '',field:''}];
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  async paginateData() {
    let res: Paginate_I = await firstValueFrom(this.patientService.paginate(this.filter));
    this.items = res.content;
    console.log(this.items);
    this.paginateObject = {
      size: res.size,
      total: res.totalElements,
      totalpages: res.totalPages,
      currentPage: res.number
    }
  }

  onEditClick(event: Patient) {
    this.router.navigate(['control/patient/create', event.id]);

    //  this.personService.servidor.emit(event);

  }

  async onDeleteClick(event: Patient) {
    await firstValueFrom(this.patientService.delete(event.id));
    this.paginateData();
  }
}