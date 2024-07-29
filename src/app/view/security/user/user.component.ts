import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from 'lodash';
import { firstValueFrom } from 'rxjs';
import { User, UserFilter } from 'src/app/models/user';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { UserRepresentation_I } from 'src/app/models/utils/User_Representation_K';
import { UserService } from 'src/app/services/user/user.service';
import { Paginate_T } from 'src/app/shared/mini-table/mini-table.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  filter: UserFilter;

  items: User[] = [];
  cols: any[] = []


  paginateObject: Paginate_T = {
    currentPage: 0,
    size: 0,
    total: 0,
    totalpages: 0
  }

  constructor(private userService: UserService, private router: Router) {
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
      { name: 'Username', field: 'username' },
      { name: 'Nombres', field: 'firstName' },
      { name: 'Apellidos', field: 'lastName' },
      { name: 'Email', field: 'email' },
      { name: 'Activo', field: 'enabled' },]
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }


  async paginateData() {

    let res: Paginate_I = await firstValueFrom(this.userService.paginate(this.filter));
    this.items = res.content;
    console.log(this.items);
    console.log(toInteger((res.totalElements + this.filter.size - 1) / this.filter.size));
    
    this.paginateObject = {
      size: this.filter.size,
      total: res.totalElements,
      totalpages: toInteger((res.totalElements + this.filter.size - 1) / this.filter.size),
      currentPage: this.filter.page
    }
  }

  update() {
    // this.items = this.items.concat(this.items);
    this.paginateData()
  }

  onPageChangexx(e: Paginate_T) {
    console.log(e);

    this.paginateObject = e


    this.filter.size = this.paginateObject.size
    this.filter.page = this.paginateObject.currentPage
    this.paginateData()
  }



  onEditClick(event: User) {
    console.log(event);
    this.router.navigate(['securityadm/user/create', event.username])


  }
  async onDeleteClick(event: User) {
    console.log(event);
    let res = await firstValueFrom(this.userService.delete(event.id));
    this.update()
  }


}
