import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Patient, PatientFilter } from 'src/app/models/patient';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Paginate_T } from 'src/app/shared/mini-table/mini-table.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
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
    totalpages: 0,
  };
  constructor(private patientService: PatientService, private router: Router) {
    this.filter = {
      page: 0,
      size: 10,
      sortFiled: 'id',
      sortOrder: 1,
    };
  }
  ngOnInit(): void {
    console.log('Init');
    this.paginateData();
    this.initCols();
  }

  initCols() {
    this.cols = [
      { name: 'Nombre', field: 'persona', subfield: 'nombre' },
      { name: 'Apellido', field: 'persona', subfield: 'apaterno' },
      { name: 'DNI', field: 'persona', subfield: 'numeroDocumento' },
      { name: 'Fecha Nac.', field: 'persona', subfield: 'fechaNacimiento', isDate: true },
      { name: 'Talla', field: 'talla' },
      { name: 'Genero', field: 'persona', subfield: 'genero' }];
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  async paginateData() {
    let res: Paginate_I = await firstValueFrom(
      this.patientService.paginate(this.filter)
    );
    this.items = res.content;
    console.log('imprimiendo content :', res.content);
    this.paginateObject = {
      size: res.size,
      total: res.totalElements,
      totalpages: res.totalPages,
      currentPage: res.number,
    };
  }

  onEditClick(event: Patient) {
    this.router.navigate(['control/patient/edit', event.id]);

    //  this.personService.servidor.emit(event);
  }

  async onDeleteClick(event: Patient) {
    await firstValueFrom(this.patientService.delete(event.id));
    this.paginateData();
    this.ngOnInit;
  }
  onNewPatient() {
    this.router.navigateByUrl('control/patient/create');
  }
}
