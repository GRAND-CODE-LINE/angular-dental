import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Symbol, SymbolFilter } from 'src/app/models/symbol';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { SymbolService } from 'src/app/services/symbol/symbol.service';
import { Paginate_T } from 'src/app/shared/mini-table/mini-table.component';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.scss']
})
export class SymbolComponent {
  filter: SymbolFilter;

  items: Symbol[] = [];
  cols: any[] = []


  paginateObject: Paginate_T = {
    currentPage: 0,
    size: 0,
    total: 0,
    totalpages: 0
  }

  constructor(private symbolService: SymbolService, private router: Router) {
    //initialize filter
    this.filter = {
      page: 0,
      size: 10,
      sortFiled: 'username',
      sortOrder: 1
    }
  }

  ngOnInit() {
    console.log('Init');
    this.paginateData();
    this.initCols();
  }

  initCols() {
    this.cols = [
      // { name: 'Id', field: 'id' },
      { name: 'Nombre', field: 'name' },
      { name: 'Grupo', field: 'group' },
      { name: 'Abreviatura', field: 'acronym' },
      { name: 'Activo', field: 'active' }]
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }


  async paginateData() {

    let res: Paginate_I = await firstValueFrom(this.symbolService.paginate(this.filter));
    this.items = res.content;
    console.log(this.items);
    this.paginateObject = {
      size: res.size,
      total: res.totalElements,
      totalpages: res.totalPages,
      currentPage: res.number
    }



  }

  update() {
    this.paginateData()
  }

  onPageChangexx(e: Paginate_T) {
    this.paginateObject = e
    this.filter.size = this.paginateObject.size
    this.filter.page = this.paginateObject.currentPage
    this.paginateData()
  }



  onEditClick(event: Symbol) {
    this.router.navigate(['control/symbol/edit', event.id])
  }
  onDeleteClick(event: Symbol) {
    console.log(event);
  }


}
