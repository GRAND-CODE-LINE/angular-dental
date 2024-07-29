import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Menu, MenuFilter } from 'src/app/models/menu';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Paginate_T } from 'src/app/shared/mini-table/mini-table.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menu: any[] = [];
  filter: MenuFilter;
  items: Menu[] = [];
  cols: any[] = [];
  canEdit: boolean = true;

  paginateObject: Paginate_T = {
    currentPage: 0,
    size: 0,
    total: 0,
    totalpages: 0,
  };

  constructor(private menuService: MenuService, private router: Router) {
    this.filter = {
      page: 0,
      size: 10,
      sortFiled: 'name',
      sortOrder: 1,
    };
  }
  ngOnInit(): void {
    this.paginateData();
    this.initCols();
  }
  initCols() {
    this.cols = [{ name: 'name', field: 'name' }];
  }
  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  async paginateData() {
    let res: Paginate_I = await firstValueFrom(
      this.menuService.paginate(this.filter)
    );
    this.items = res.content;
    this.paginateObject = {
      size: res.size,
      total: res.totalElements,
      totalpages: res.totalPages,
      currentPage: res.number,
    };
  }
  onEditClick(event: Menu) {
    this.router.navigate(['adm/menu/edit', event.id]);
  }
  async onDeleteClick(event: Menu) {
    await firstValueFrom(this.menuService.delete(event.id));
    this.paginateData();
  }
  OpenCreate() {
    this.router.navigate(['adm/menu/create']);
  }
}
