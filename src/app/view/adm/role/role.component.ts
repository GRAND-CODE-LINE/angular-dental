import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Role, RoleFilter } from 'src/app/models/role';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { RoleService } from 'src/app/services/role/role.service';

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

  constructor(private roleService: RoleService) {
    //initialize filter
    this.filter = {
      page: 0,
      size: 10,
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
    this.cols = [{ name: 'Nombre', field: 'name' }]
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



  }
}
