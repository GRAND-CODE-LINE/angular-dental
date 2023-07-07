import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Person, PersonFilter } from 'src/app/models/Person';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { PersonServiceService } from 'src/app/services/person/person-service.service';
import { Paginate_T } from 'src/app/shared/mini-table/mini-table.component';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  persons: any[] = [];
  //filter interface Person extendes FILTER_I interface
  filter: PersonFilter;
  items: Person[] = [];
  cols: any[] = [];

  paginateObject: Paginate_T = {
    currentPage: 0,
    size: 0,
    total: 0,
    totalpages: 0
  }

  constructor(private personService: PersonServiceService) {
    // initialize filter
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
      { name: 'Mail', field: 'email'},
      { name: 'DNI' , field: 'numeroDocumento'},
      { name: 'Fecha Nac.', field:'fechaNacimiento'}];
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  async paginateData() {
    let res: Paginate_I = await firstValueFrom(this.personService.paginate(this.filter));
    this.items = res.content;
    console.log(this.items);
    this.paginateObject = {
      size: res.size,
      total: res.totalElements,
      totalpages: res.totalPages,
      currentPage :res.number
    }
  }
}
