import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Role, RoleFilter } from 'src/app/models/role';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { RoleService } from 'src/app/services/role/role.service';
import { Paginate_T } from 'src/app/shared/mini-table/mini-table.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  // filter interface ROLE extendes FILTER_I interface
  filter: RoleFilter;

  items: Role[] = [];
  cols: any[] = []


  paginateObject: Paginate_T = {
    currentPage: 0,
    size: 0,
    total: 0,
    totalpages: 0
  }

  constructor(private roleService: RoleService) {
    //initialize filter
    this.filter = {
      page: 0,
      size: 2,
      sortFiled: 'name',
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
      { name: 'Id', field: 'id' },
      { name: 'Nombre', field: 'name' },
      { name: 'Test', field: 'test' }]
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }


  async paginateData() {

    let res: Paginate_I = await firstValueFrom(this.roleService.paginate(this.filter));
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
    this.items = this.items.concat(this.items);
  }

  onPageChangexx(e: Paginate_T) {
    console.log(e);

    this.paginateObject = e

    
    this.filter.size = this.paginateObject.size
    this.filter.page = this.paginateObject.currentPage
    this.paginateData()
  }
}
