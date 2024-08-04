import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { itemsType } from 'src/app/models/Person';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-createmenu',
  templateUrl: './createmenu.component.html',
  styleUrls: ['./createmenu.component.scss'],
})
export class CreatemenuComponent implements OnInit, OnDestroy, OnChanges {
  documentType!: Observable<itemsType[]>;

  menu!: Menu;
  name!: string;
  listSubmenu: Menu[] = new Array();
  oldsubmenu!: Menu;
  menuForm!: FormGroup;
  submenuForm!: FormGroup;
  modoEditar: Boolean = false;
  visible: boolean = false;
  constructor(
    private service: MenuService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  getDocumentType() {
    return this.http.get<itemsType[]>('assets/Documents/Documents.json');
  }

  ngOnInit() {
    this.initForms();
    if (this.route.snapshot.params['id'] != undefined) {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.service.getById(id).subscribe((data: any) => this.Llenar(data));
    }
  }
  async create() {
    if (!this.modoEditar) {
      this.menu = this.menuForm.value;
      this.menu.subMenu = this.listSubmenu;
      await firstValueFrom(this.service.create(this.menu));
    } else {
      this.menu = this.menuForm.value;
      this.menu.subMenu = this.listSubmenu;
      await firstValueFrom(this.service.create(this.menu));
    }
    this.router.navigate(['adm/menu']);
  }

  goBack() {
    this.router.navigate(['adm/menu']);
  }

  initForms() {
    this.documentType = this.getDocumentType();
    this.menuForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required])],
    });
    this.submenuForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
    });
  }

  openModal() {
    this.visible = true;
  }
  addSubmenu() {
    let submenu: Menu = this.submenuForm.value;
    console.log(submenu);
    if (!this.listSubmenu.some((item) => item.name === this.oldsubmenu?.name)) {
      this.listSubmenu.push(submenu);
    } else {
      const index = this.listSubmenu.findIndex(
        (item) => item.name === this.oldsubmenu.name
      );
      if (index !== -1) {
        this.listSubmenu[index] = submenu;
      }
    }
    this.visible = false;
    this.submenuForm.reset();
  }

  ngOnChanges() {
    console.log('changes');
  }
  ngOnDestroy() {
    console.log('Destroy Menu');
  }
  Llenar(data: Menu) {
    this.menuForm.patchValue(data);
    this.menu = data;
    if (this.menu.subMenu) {
      this.menu.subMenu.forEach((child) => {
        this.listSubmenu.push(child);
      });
    }
  }
  editMenu(item: Menu) {
    this.visible = true;
    this.submenuForm.patchValue(item);
    this.oldsubmenu = item;
  }
  deleteMenu(item: Menu) {
    const isEqual = (a: Menu, b: Menu) => {
      return a.id === b.id && a.name === b.name; // Añade más propiedades si es necesario
    };

    console.log(this.listSubmenu);
    let newlist: Menu[] = this.listSubmenu.filter(
      (submenuItem) => !isEqual(submenuItem, item)
    );
    console.log(newlist);
    this.menu.subMenu = newlist;
    this.listSubmenu = newlist;
  }
}
