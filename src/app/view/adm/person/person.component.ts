import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Person, PersonFilter } from 'src/app/models/Person';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { PersonServiceService } from 'src/app/services/person/person-service.service';


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
    this.initCols();
    this.paginateData();

  }

  initCols() {
    this.cols = [{ name: 'Nombre', field: 'nombre' }, { name: 'Apellido Pat.', field: 'apaterno' },
    { name: 'Apellido Mat.', field: 'amaterno' }, { name: 'DNI', field: 'numeroDocumento' }]
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
  }
}
